import core from'@anliting/core'
import fs from'fs'
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
        await Promise.all([
            core.fsyncByPath('data-next'),
            core.fsyncByPath('data-next/tmp'),
            core.fsyncByPath('data-next/user'),
            core.fsyncByPath('data-next/user/main'),
            core.fsyncByPath('data-next/user/user'),
        ])
        await fs.promises.rename('data-next','data')
        await core.fsyncByPath('.')
    }
    await this.__next()
    await rmrf('data/next')
}
function Database(){
    this.load=this._ready=load.call(this)
    this._nextTempPath=0
}
Database.prototype.__next=async function(){
    let a
    try{
        a=JSON.parse(''+await fs.promises.readFile('data/next/main'))
    }catch(e){
        return
    }
    for(let b of a[1])
        if(b[0]==1){
            await rmrf(b[1])
            await fs.promises.mkdir(b[1])
            await core.fsyncWithParentByPath(b[1])
        }
    await fs.promises.unlink('data/next/main')
    await core.fsyncByPath('data/next')
    await rmrf('data/next')
    await core.fsyncByPath('data')
}
Database.prototype.__update=async function(a,b){
    a=a||[]
    b=b||[]
    await fs.promises.mkdir('data/next')
    await core.fsyncByPath('data/next')
    await fs.promises.writeFile('data/next/main',JSON.stringify([a,b]))
    await Promise.all([
        core.fsyncByPath('data/next'),
        core.fsyncByPath('data/next/main'),
    ])
    await this.__next()
}
Database.prototype._cutTempPath=function(path){
}
Database.prototype._getUserIndex=async function(){
    return JSON.parse(
        ''+await fs.promises.readFile(`data/user/main`)
    ).index
}
Database.prototype._putTempPath=function(){
    return''+this._nextTempPath++
}
Database.prototype._setUserIndex=async function(index){
    let o=JSON.parse(
        ''+await fs.promises.readFile('data/user/main')
    )
    o.index++
    await fs.promises.writeFile(
        'data/user/main',JSON.stringify(o)
    )
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
Database.prototype.putUser=function(){
    return this._ready=(async()=>{
        await this._ready
        let id=await this._getUserIndex()
        await this._setUserIndex(id+1)
        await this.__update(0,[
            [1,`data/user/user/${id}`]
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
        let passwordPath=`data/user/user/${user}/password`
        let tempPath=this._putTempPath()
        await fs.promises.writeFile(`data/tmp/${tempPath}`,password)
        await core.fsyncByPath(`data/tmp/${tempPath}`)
        await fs.promises.rename(`data/tmp/${tempPath}`,passwordPath)
        await core.fsyncByPath(passwordPath)
        this._cutTempPath(tempPath)
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
