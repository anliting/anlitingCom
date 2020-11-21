import anlitingCore from'@anliting/core'
import afs from'@anliting/fs'
import fs from'fs'
import rmrf from'rmrf'
async function load(){
    if(await anlitingCore.existFile('data'))
        return
    await rmrf('data-next')
    await fs.promises.mkdir('data-next')
    await fs.promises.mkdir('data-next/tmp')
    await fs.promises.mkdir('data-next/user')
    await fs.promises.writeFile('data-next/user/main',JSON.stringify({
        index:0,
    }))
    await fs.promises.mkdir('data-next/user/user')
    await Promise.all([
        afs.fsyncByPath('data-next'),
        afs.fsyncByPath('data-next/tmp'),
        afs.fsyncByPath('data-next/user'),
        afs.fsyncByPath('data-next/user/main'),
        afs.fsyncByPath('data-next/user/user'),
    ])
    await fs.promises.rename('data-next','data')
    await afs.fsyncByPath('.')
}
function Database(){
    this.load=this._ready=load.call(this)
    this._nextTempPath=0
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
        await fs.promises.mkdir(`data/user/user/${id}`)
        return id
    })()
}
Database.prototype.setOwn=function(user,buffer){
    return this._ready=(async()=>{
        await this._ready
        return fs.promises.writeFile(`data/user/user/${user}/own`,buffer)
    })()
}
Database.prototype.setPassword=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        let passwordPath=`data/user/user/${user}/password`
        let tempPath=this._putTempPath()
        await fs.promises.writeFile(`data/tmp/${tempPath}`,password)
        await afs.fsyncByPath(`data/tmp/${tempPath}`)
        await fs.promises.rename(`data/tmp/${tempPath}`,passwordPath)
        await afs.fsyncByPath(passwordPath)
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
