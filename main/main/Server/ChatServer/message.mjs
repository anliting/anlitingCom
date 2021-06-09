async function invite(session,doc,message){
    let i=session.get()
    if(!(
        doc.user!=undefined
    ))
        return
    await this.invite(
        message.readUInt32BE(1),
        doc.user,
        message.readUInt32BE(5)
    )
    session.reply(i,Buffer.allocUnsafe(0))
}
async function leave(session,doc,message){
    let i=session.get()
    if(!(
        doc.user!=undefined
    ))
        return
    await this.leave(message.readUInt32BE(1),doc.user)
    session.reply(i,Buffer.allocUnsafe(0))
}
function listenMessageList(session,doc,message){
    let i=session.get(),roomId=message.readUInt32BE(1),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }
    if(!(
        doc.user!=undefined&&
        this.room.array.some(a=>
            a.id==roomId&&a.user.includes(doc.user)
        )
    ))
        return
    let chatDoc=this._session.get(session)
    chatDoc.listenMessageList=[roomId,reply]
    reply(this.roomMessage[roomId])
}
async function listenRoomList(session,doc){
    let i=session.get(),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }
    if(!(
        doc.user!=undefined
    ))
        return
    let chatDoc=this._session.get(session)
    chatDoc.listenRoomList=[doc.user,reply]
    reply(this.room.array.filter(a=>
        a.user.includes(doc.user)
    ))
}
async function putMessage(session,doc,message){
    let i=session.get()
    if(!(
        doc.user!=undefined
    ))
        return
    await this.putMessage(message.readUInt32BE(1),doc.user,message.slice(5))
    session.reply(i,Buffer.allocUnsafe(0))
}
async function putRoom(session,doc){
    let i=session.get()
    if(!(
        doc.user!=undefined
    ))
        return
    await this.putRoom(doc.user)
    session.reply(i,Buffer.allocUnsafe(0))
}
async function unlistenRoomList(session,doc){
    if(!(
        doc.user!=undefined
    ))
        return
    let chatDoc=this._session.get(session)
    chatDoc.listenRoomList=0
}
async function message(session,doc,message,operationCode){
    if(operationCode==4)
        await putRoom.call(this,session,doc)
    if(operationCode==7)
        await listenRoomList.call(this,session,doc)
    if(operationCode==8)
        await putMessage.call(this,session,doc,message)
    if(operationCode==9)
        listenMessageList.call(this,session,doc,message)
    if(operationCode==10)
        await invite.call(this,session,doc,message)
    if(operationCode==11)
        await leave.call(this,session,doc,message)
}
export default message
