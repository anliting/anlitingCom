import core from    '@anliting/core'
import fs from      'fs'
import{Stream}from  '@anliting/dt'
function Database(ready){
    this._out=(this.out=new Stream).caller
    this._ready=(async()=>{
        await ready
        if(await core.existFile('data/user'))
            return
        await this._out.update([
            [1,'data/user'],
            [
                0,
                'data/user/main',
                JSON.stringify({
                    index:0,
                })
            ],
            [1,'data/user/user'],
        ])
    })()
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
        await this._out.update([
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
        await this._out.update([
            [2,`data/user/user/${id}`],
        ])
    })()
}
Database.prototype.end=function(){
    return this._ready
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
Database.prototype.setPassword=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        await this._out.update([
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
