import reply from './reply.mjs'
function listenMessageList(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    doc.session.outStream.in([
        'listenMessageList',
        message.readUInt32BE(1),
        a=>{
            reply(connection,i,Buffer.from(JSON.stringify(a)))
        }
    ])
}
function listenRoomList(connection){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    doc.session.outStream.in(['listenRoomList',a=>{
        reply(connection,i,Buffer.from(JSON.stringify(a)))
    }])
}
async function putMessage(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'putMessage',
        message.readUInt32BE(1),
        message.slice(5),
        ()=>{
            reply(connection,i,Buffer.allocUnsafe(0))
        },
    ])
}
async function putRoom(connection){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.outStream.in([
        'putRoom',
        ()=>{
            reply(connection,i,Buffer.allocUnsafe(0))
        },
    ])
}
function chatOnMessage(connection,message,operationCode){
    if(operationCode==4)
        putRoom.call(this,connection)
    if(operationCode==7)
        listenRoomList.call(this,connection)
    if(operationCode==8)
        putMessage.call(this,connection,message)
    if(operationCode==9)
        listenMessageList.call(this,connection,message)
}
export default chatOnMessage
