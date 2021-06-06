import Database from        './ChatServer/Database.mjs'
import call from            './ChatServer/call.mjs'
function ChatServer(){
    this._database=new Database(new Promise(rs=>{
        this._loadDatabase=rs
    }))
    this._session=new Map
    this.load=(async()=>{
        this.room=await this._database.getRoom()
        this.roomMessage={}
        for(let room of this.room.array)
            this.roomMessage[room.id]=
                await this._database.getRoomMessage(room.id)
    })()
}
ChatServer.prototype.loadDatabase=function(){
    this._loadDatabase()
}
ChatServer.prototype.invite=async function(room,user0,user1){
    let b=this.room.array.filter(b=>
        b.id==room&&b.user.includes(user0)
    )
    if(!b.length)
        return
    b=b[0]
    let s=new Set(b.user)
    s.add(user1)
    b.user=[...s.keys()]
    await this._database.setRoomList(this.room)
}
ChatServer.prototype.leave=async function(room,user){
    let b=this.room.array.filter(b=>
        b.id==room&&b.user.includes(user)
    )
    if(!b.length)
        return
    b=b[0]
    let s=new Set(b.user)
    s.delete(user)
    b.user=[...s.keys()]
    await this._database.setRoomList(this.room)
}
ChatServer.prototype.putMessage=async function(room,user,message){
    if(!(
        this.room.array.some(b=>
            b.id==room&&b.user.includes(user)
        )
    ))
        return
    await this._database.putRoomMessage(
        room,user,''+message
    )
    this.roomMessage[room].push({
        user:user,
        content:''+message
    })
}
ChatServer.prototype.putRoom=async function(user){
    let room=await this._database.putRoom(user)
    this.room.array.push({
        id:this.room.index++,
        user:[user],
    })
    this.roomMessage[room]=[]
}
ChatServer.prototype.cutSession=function(session){
    this._session.delete(session)
}
ChatServer.prototype.putSession=function(session){
    this._session.set(session,{})
}
ChatServer.prototype.call=call
export default ChatServer
