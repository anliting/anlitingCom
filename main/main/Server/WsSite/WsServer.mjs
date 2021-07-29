import http from'http'
import https from'https'
import{WebSocketServer}from'ws'
function Connection(connection){
    this._connection=connection
    this._connection.on('close',()=>
        this.out.close()
    ).on('message',message=>{
        if(!(message instanceof Buffer))
            return
        this.out.message(message)
    })
}
Connection.prototype.send=function(a){
    this._connection.send(a)
}
function WsServer(tls){
    this._connectionMap=new Map
    this._httpServer=tls?
        https.createServer().on('secureConnection',socket=>{
            socket.on('error',()=>{})
        }).on('tlsClientError',()=>{})
    :
        http.createServer()
    this._wsServer=new WebSocketServer({
        server:this._httpServer,
    }).on('connection',connection=>{
        let doc={}
        this._connectionMap.set(connection,doc)
        connection.on('close',()=>{
            this._connectionMap.delete(connection)
        }).on('pong',()=>{
            let doc=this._connectionMap.get(connection)
            delete doc.ping
        })
        this.out.connection(new Connection(connection))
    })
    this._interval=setInterval(()=>{
        for(let connection of this._connectionMap.keys()){
            let doc=this._connectionMap.get(connection)
            if('ping' in doc){
                connection.terminate()
                continue
            }
            doc.ping=0
            connection.ping()
        }
    },8e3)
}
WsServer.prototype.end=function(){
    return new Promise(rs=>{
        clearInterval(this._interval)
        this._httpServer.close(rs)
        for(let connection of this._connectionMap.keys())
            connection.terminate()
    })
}
WsServer.prototype.listen=function(a){
    return new Promise(rs=>
        this._httpServer.listen(...a,rs)
    )
}
WsServer.prototype.setSecureContext=function(secureContext){
    this._httpServer.setSecureContext(secureContext)
}
export default WsServer
