/*
    data/tmp: for upload
    data/user: for user
*/
import core from'@anliting/core'
import fs from'fs'
import path from'path'
import rmrf from'rmrf'
async function load(){
    if(!await core.existFile('data')){
        await rmrf('data-next')
        await fs.promises.mkdir('data-next')
        await fs.promises.mkdir('data-next/tmp')
        await fs.promises.mkdir('data-next/user')
        await fs.promises.writeFile('data-next/user/main',JSON.stringify({
            index:0,
        }))
        await fs.promises.mkdir('data-next/user/user')
        await fs.promises.rename('data-next','data')
    }
    await this.__next()
}
function Database(){
    this._ready=load.call(this)
}
Database.prototype.__next=async function(){
    let a
    try{
        a=JSON.parse(''+await fs.promises.readFile('data/next/main'))
    }catch(e){
    }
    if(a){
        let i=0
        for(let b of a){
            let stat,noent
            try{
                stat=await fs.promises.stat(b[1])
            }catch(e){
                if(!(e.code=='ENOENT'))
                    throw e
                noent=1
            }
            if(!noent)
                if(stat.isDirectory())
                    await rmrf(b[1])
                else
                    await fs.promises.unlink(b[1])
            if(b[0]<2){
                await(
                    b[0]==0?
                        fs.promises.link(`data/next/${i++}`,b[1])
                    :
                        fs.promises.mkdir(b[1])
                )
            }
        }
        await fs.promises.unlink('data/next/main')
    }
    await rmrf('data/next')
}
Database.prototype.__update=async function(a){
    await fs.promises.mkdir('data/next')
    let i=0
    for(let b of a)if(b[0]==0)
        await fs.promises.writeFile(`data/next/${i++}`,b[2])
    await fs.promises.writeFile('data/next/main',JSON.stringify(a))
    await this.__next()
}
Database.prototype._getUserIndex=async function(){
    return JSON.parse(
        ''+await fs.promises.readFile(`data/user/main`)
    ).index
}
Database.prototype._setUserIndex=async function(index){
    let o=JSON.parse(
        ''+await fs.promises.readFile('data/user/main')
    )
    o.index++
    return[[0,'data/user/main',JSON.stringify(o)]]
}
Database.prototype._setUserPassword=async function(id,password){
    return[[0,`data/user/user/${id}/password`,password]]
}
Database.prototype.end=function(){
    return this._ready
}
Database.prototype.getOwn=function(user){
    return this._ready=(async()=>{
        await this._ready
        try{
            return await fs.promises.readFile(`data/user/user/${user}/own`)
        }catch(e){
            if(e.code=='ENOENT')
                return Buffer.from(JSON.stringify([]))
            throw e
        }
    })()
}
Database.prototype.putSuperUserWithPassword=function(password){
    return this._ready=(async()=>{
        await this._ready
        let id=await this._getUserIndex()
        await this.__update([
            ...await this._setUserIndex(id+1),
            [1,`data/user/user/${id}`],
            [0,`data/user/user/${id}/main`,'{"admin":true}'],
            ...await this._setUserPassword(id,password),
        ])
        return id
    })()
}
Database.prototype.putUserWithPassword=function(password){
    return this._ready=(async()=>{
        await this._ready
        let id=await this._getUserIndex()
        await this.__update([
            ...await this._setUserIndex(id+1),
            [1,`data/user/user/${id}`],
            [0,`data/user/user/${id}/main`,'{}'],
            ...await this._setUserPassword(id,password),
        ])
        return id
    })()
}
Database.prototype.setOwn=function(user,buffer){
    return this._ready=(async()=>{
        await this._ready
        await fs.promises.writeFile(`data/user/user/${user}/own`,buffer)
    })()
}
Database.prototype.setPassword=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        await this.__update([
            ...await this._setUserPassword(user,password),
        ])
    })()
}
Database.prototype.testCredential=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        let
            userPath=`data/user/user/${user}`,
            passwordPath=`${userPath}/password`
        try{
            return!(
                await fs.promises.readFile(passwordPath)
            ).compare(password)
        }catch(e){
            if(e.code=='ENOENT')
                return 0
            throw e
        }
    })()
}
export default Database
