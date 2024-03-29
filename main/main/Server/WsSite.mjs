import WsServer from        './WsSite/WsServer.mjs'
import{Stream}from          '@anliting/dt'
function onMessage(connection,message){
    let doc=this._connectionMap.get(connection)
    let operationCode=message.readUInt8()
    if(operationCode<16)
        doc.session.out.in(['user',message,operationCode])
    else if(16<=operationCode&&operationCode<32)
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
