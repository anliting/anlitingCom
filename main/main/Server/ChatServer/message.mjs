async function invite(session,message){
    let i=session.get()
    session.out.in([
        'invite',
        message.readUInt32BE(1),
        message.readUInt32BE(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function leave(session,message){
    let i=session.get()
    session.out.in([
        'leave',
        message.readUInt32BE(1),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
function listenMessageList(session,message){
    let i=session.get()
    session.out.in([
        'listenMessageList',
        message.readUInt32BE(1),
        a=>{
            session.reply(i,Buffer.from(JSON.stringify(a)))
        }
    ])
}
function listenRoomList(session){
    let i=session.get()
    session.out.in(['listenRoomList',a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }])
}
async function putMessage(session,message){
    let i=session.get()
    session.out.in([
        'putMessage',
        message.readUInt32BE(1),
        message.slice(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function putRoom(session){
    let i=session.get()
    session.out.in([
        'putRoom',
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
function message(session,message,operationCode){
    if(operationCode==4)
        putRoom.call(this,session)
    if(operationCode==7)
        listenRoomList.call(this,session)
    if(operationCode==8)
        putMessage.call(this,session,message)
    if(operationCode==9)
        listenMessageList.call(this,session,message)
    if(operationCode==10)
        invite.call(this,session,message)
    if(operationCode==11)
        leave.call(this,session,message)
}
export default message
