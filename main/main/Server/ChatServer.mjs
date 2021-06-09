import Database from        './ChatServer/Database.mjs'
import message from         './ChatServer/message.mjs'
function ChatServer(){
    this._database=new Database(new Promise(rs=>{
        this.loadDatabase=rs
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
ChatServer.prototype._pushRoomList=function(){
    for(let doc of this._session.values())
        if(doc.listenRoomList)
            doc.listenRoomList[1](
                this.room.array.filter(a=>
                    a.user.includes(doc.listenRoomList[0])
                )
            )
}
ChatServer.prototype.cutSession=function(session){
    this._session.delete(session)
}
ChatServer.prototype.putSession=function(session){
    this._session.set(session,{})
}
ChatServer.prototype.call=async function(session,doc,a){
    let chatDoc=this._session.get(session)
    switch(a[0]){
        case'logOut':
            chatDoc.listenMessageList=0
            chatDoc.listenRoomList=0
        break
        case'unlistenRoomList':
            chatDoc.listenRoomList=0
        break
    }
}
ChatServer.prototype.message=message
export default ChatServer
