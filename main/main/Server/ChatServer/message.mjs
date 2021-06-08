async function invite(session,doc,message){
    let i=session.get()
    await this.call(session,doc,[
        'invite',
        message.readUInt32BE(1),
        message.readUInt32BE(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function leave(session,doc,message){
    let i=session.get()
    await this.call(session,doc,[
        'leave',
        message.readUInt32BE(1),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function listenMessageList(session,doc,message){
    let i=session.get()
    await this.call(session,doc,[
        'listenMessageList',
        message.readUInt32BE(1),
        a=>{
            session.reply(i,Buffer.from(JSON.stringify(a)))
        }
    ])
}
async function listenRoomList(session,doc){
    let i=session.get()
    await this.call(session,doc,['listenRoomList',a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }])
}
async function putMessage(session,doc,message){
    let i=session.get()
    await this.call(session,doc,[
        'putMessage',
        message.readUInt32BE(1),
        message.slice(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function putRoom(session,doc){
    let i=session.get()
    await this.call(session,doc,[
        'putRoom',
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function message(session,doc,message,operationCode){
    if(operationCode==4)
        await putRoom.call(this,session,doc)
    if(operationCode==7)
        await listenRoomList.call(this,session,doc)
    if(operationCode==8)
        await putMessage.call(this,session,doc,message)
    if(operationCode==9)
        await listenMessageList.call(this,session,doc,message)
    if(operationCode==10)
        await invite.call(this,session,doc,message)
    if(operationCode==11)
        await leave.call(this,session,doc,message)
}
export default message
