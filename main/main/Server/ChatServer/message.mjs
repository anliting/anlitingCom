async function invite(connection,session,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'invite',
        message.readUInt32BE(1),
        message.readUInt32BE(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function leave(connection,session,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'leave',
        message.readUInt32BE(1),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
function listenMessageList(connection,session,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    doc.session.outStream.in([
        'listenMessageList',
        message.readUInt32BE(1),
        a=>{
            session.reply(i,Buffer.from(JSON.stringify(a)))
        }
    ])
}
function listenRoomList(connection,session){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    doc.session.outStream.in(['listenRoomList',a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }])
}
async function putMessage(connection,session,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'putMessage',
        message.readUInt32BE(1),
        message.slice(5),
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
async function putRoom(connection,session){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'putRoom',
        ()=>{
            session.reply(i,Buffer.allocUnsafe(0))
        },
    ])
}
function chatOnMessage(session,connection,message,operationCode){
console.log(session,connection,message,operationCode)
    if(operationCode==4)
        putRoom.call(this,connection,session)
    if(operationCode==7)
        listenRoomList.call(this,connection,session)
    if(operationCode==8)
        putMessage.call(this,connection,session,message)
    if(operationCode==9)
        listenMessageList.call(this,connection,session,message)
    if(operationCode==10)
        invite.call(this,connection,session,message)
    if(operationCode==11)
        leave.call(this,connection,session,message)
}
export default chatOnMessage
