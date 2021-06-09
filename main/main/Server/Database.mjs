/*
    data/tmp: for upload
    data/user: for user
*/
import core from'@anliting/core'
import fs from'fs'
import rmrf from'rmrf'
import AtomicDirectoryUpdater from  './AtomicDirectoryUpdater.mjs'
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
    this._atomicDirectoryUpdater=new AtomicDirectoryUpdater
    await this._atomicDirectoryUpdater.next()
}
function Database(){
    this._ready=this.load=load.call(this)
}
Database.prototype._getUserIndex=async function(){
    return JSON.parse(
        ''+await fs.promises.readFile(`data/user/main`)
    ).index
}
Database.prototype._putUser=function(password,main){
    return this._ready=(async()=>{
        await this._ready
        let id=await this._getUserIndex()
        await this._atomicDirectoryUpdater.update([
            ...await this._setUserIndex(id+1),
            [1,`data/user/user/${id}`],
            [0,`data/user/user/${id}/main`,main],
            ...await this._setUserPassword(id,password),
        ])
        return id
    })()
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
Database.prototype.cutUser=function(id){
    return this._ready=(async()=>{
        await this._ready
        await this._atomicDirectoryUpdater.update([
            [2,`data/user/user/${id}`],
        ])
    })()
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
Database.prototype.getUser=function(user){
    return this._ready=(async()=>{
        await this._ready
        try{
            return JSON.parse(''+await fs.promises.readFile(
                `data/user/user/${user}/main`
            ))
        }catch(e){
            if(e.code=='ENOENT')
                return
            throw e
        }
    })()
}
Database.prototype.putSuperUser=function(password){
    return this._putUser(password,'{"admin":true}')
}
Database.prototype.putUser=function(password){
    return this._putUser(password,'{}')
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
        await this._atomicDirectoryUpdater.update([
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
