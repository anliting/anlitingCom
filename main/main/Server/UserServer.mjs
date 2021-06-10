/*Database.prototype.getOwn=function(user){
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
Database.prototype.setOwn=function(user,buffer){
    return this._ready=(async()=>{
        await this._ready
        await fs.promises.writeFile(`data/user/user/${user}/own`,buffer)
    })()
}*/
import Database from        './UserServer/Database.mjs'
import message from         './UserServer/message.mjs'
function UserServer(){
    this._database=new Database(new Promise(rs=>{
        this.loadDatabase=rs
    }))
    this.out=this._database.out
    this._session=new Map
}
UserServer.prototype.end=function(){
    return this._database.end()
}
UserServer.prototype.cutSession=function(session){
    this._session.delete(session)
}
UserServer.prototype.putSession=function(session){
    this._session.set(session,{})
}
UserServer.prototype.call=async function(session,doc,a){
    let userDoc=this._session.get(session)
}
UserServer.prototype.message=message
export default UserServer
