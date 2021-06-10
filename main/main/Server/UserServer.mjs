import Database from        './UserServer/Database.mjs'
import message from         './UserServer/message.mjs'
function UserServer(){
    this._database=new Database(new Promise(rs=>{
        this.loadDatabase=rs
    }))
    this.out=this._database.out
    this._session=new Map
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
