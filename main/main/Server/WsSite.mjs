import WsServer from'./WsSite/WsServer.mjs'
import Stream from  './Stream.mjs'
function reply(connection,i,content){
    let buf=Buffer.allocUnsafe(5)
    buf.writeUInt8(0)
    buf.writeUInt32BE(i,1)
    connection.send(Buffer.concat([buf,content])) 
}
async function cutCurrentUser(connection){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    await new Promise(rs=>doc.session.outStream.in(['cutCurrentUser',rs]))
    reply(connection,i,Buffer.allocUnsafe(0))
}
async function getOwn(connection){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    reply(connection,i,await new Promise(rs=>doc.session.outStream.in(['getOwn',rs])))
}
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
async function logIn(connection,message){
    this._connectionMap.get(connection).session.outStream.in([
        'logIn',
        message.readUInt32BE(1),
        message.slice(5)
    ])
}
async function logOut(connection){
    this._connectionMap.get(connection).session.outStream.in(['logOut'])
}
async function putMessage(connection,message){
    this._connectionMap.get(connection).session.outStream.in([
        'putMessage',
        message.readUInt32BE(1),
        message.slice(5)
    ])
}
async function putUser(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++,
        buf=Buffer.allocUnsafe(4)
    buf.writeUInt32BE(await new Promise(rs=>
        doc.session.outStream.in(['putUser',message.slice(1),rs])
    ))
    reply(connection,i,buf)
}
async function putRoom(connection){
    this._connectionMap.get(connection).session.outStream.in(['putRoom'])
}
async function setOwn(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    await new Promise(rs=>
        doc.session.outStream.in(['setOwn',message.slice(1),rs])
    )
    reply(connection,i,Buffer.allocUnsafe(0))
}
function onMessage(connection,message){
    let operationCode=message.readUInt8()
    if(operationCode==0)
        logIn.call(this,connection,message)
    if(operationCode==1)
        logOut.call(this,connection)
    if(operationCode==2)
        putUser.call(this,connection,message)
    if(operationCode==3)
        cutCurrentUser.call(this,connection)
    if(operationCode==4)
        putRoom.call(this,connection)
    /*if(operationCode==5)
        setOwn.call(this,connection,message)
    if(operationCode==6)
        getOwn.call(this,connection)*/
    if(operationCode==7)
        listenRoomList.call(this,connection)
    if(operationCode==8)
        putMessage.call(this,connection,message)
    if(operationCode==9)
        listenMessageList.call(this,connection,message)
}
function syncLoggedOut(connection){
    let buf=Buffer.allocUnsafe(1)
    buf.writeUInt8(1)
    connection.send(buf) 
}
function WsSite(tls){
    this._connectionMap=new Map
    this._wsServer=new WsServer(tls)
    this._wsServer.out={
        connection:connection=>{
            let doc={
                get:0,
                session:{
                    logOut(){
                        syncLoggedOut.call(this,connection)
                    },
                    outStream:new Stream,
                },
            }
            this._connectionMap.set(connection,doc)
            this.out.putSession(doc.session)
            connection.out={
                close:()=>{
                    this._connectionMap.delete(connection)
                    this.out.cutSession(doc.session)
                },
                message:message=>{
                    onMessage.call(this,connection,message)
                },
            }
        }
    }
}
WsSite.prototype.setSecureContext=function(secureContext){
    this._wsServer.setSecureContext(secureContext)
}
WsSite.prototype.listen=function(a){
    return this._wsServer.listen(a)
}
WsSite.prototype.end=function(){
    return this._wsServer.end()
}
export default WsSite
