import WsServer from        './WsSite/WsServer.mjs'
import Stream from          './Stream.mjs'
async function cutCurrentUser(connection){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    await new Promise(rs=>doc.session.out.in(['cutCurrentUser',rs]))
    this._reply(connection,i,Buffer.allocUnsafe(0))
}
async function listenUserProfile(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.out.in([
        'listenUserProfile',
        message.readUInt32BE(1),
        a=>{
            this._reply(connection,i,Buffer.from(JSON.stringify(a)))
        }
    ])
}
async function unlistenUserProfile(connection,message){
    let
        doc=this._connectionMap.get(connection),
        i=doc.get++
    this._connectionMap.get(connection).session.out.in([
        'unlistenUserProfile',
        message.readUInt32BE(1),
        ()=>{
            this._reply(connection,i,Buffer.allocUnsafe(0))
        }
    ])
}
async function logIn(connection,message){
    this._connectionMap.get(connection).session.out.in([
        'logIn',
        message.readUInt32BE(1),
        message.slice(5)
    ])
}
async function logOut(connection){
    this._connectionMap.get(connection).session.out.in(['logOut'])
}
function onMessage(connection,message){
    let doc=this._connectionMap.get(connection)
    let operationCode=message.readUInt8()
    if(operationCode<16){
        if(operationCode==0)
            logIn.call(this,connection,message)
        if(operationCode==1)
            logOut.call(this,connection)
        if(2<=operationCode&&operationCode<3)
            doc.session.out.in(['user',message,operationCode])
        if(operationCode==3)
            cutCurrentUser.call(this,connection)
        if(operationCode==12)
            listenUserProfile.call(this,connection,message)
        if(operationCode==13)
            unlistenUserProfile.call(this,connection,message)
    }else if(16<=operationCode&&operationCode<32)
        doc.session.out.in(['chat',message,operationCode])
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
                    out:new Stream,
                    reply:(i,content)=>{
                        this._reply(connection,i,content)
                    },
                    get:()=>doc.get++,
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
WsSite.prototype._reply=function(connection,i,content){
    let buf=Buffer.allocUnsafe(5)
    buf.writeUInt8(0)
    buf.writeUInt32BE(i,1)
    connection.send(Buffer.concat([buf,content])) 
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
