import Database from        './UserServer/Database.mjs'
import message from         './UserServer/message.mjs'
function UserServer(){
    this._database=new Database(new Promise(rs=>{
        this.loadDatabase=rs
    }))
    this.out=this._database.out
}
UserServer.prototype.end=function(){
    return this._database.end()
}
UserServer.prototype.message=message
UserServer.prototype.pushUser=async function(id,cb){
    let user=await this._database.getUser(id)
    if(user)
        cb([1,{
            name:user.name||'',
        }])
    else
        cb([0])
}
export default UserServer
