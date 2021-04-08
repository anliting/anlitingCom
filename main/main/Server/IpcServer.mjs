import net from         'net'
import core from        '@anliting/core'
function IpcServer(){
    this._server=net.createServer({allowHalfOpen:true})
    this._connection=new Set
    this._server.on('connection',connection=>{
        this._connection.add(connection)
        ;(async()=>{
            let res=await this.out(await core.content(connection))
            if(res)
                connection.end(res)
        })()
        connection.on('close',()=>this._connection.delete(connection))
    })
}
IpcServer.prototype.listen=function(){
    return new Promise(rs=>
        this._server.listen('ipc',rs)
    )
}
IpcServer.prototype.end=function(){
    return new Promise(rs=>{
        this._server.close(rs)
        this._connection.forEach(a=>
            a.destroy()
        )
    })
}
export default IpcServer
