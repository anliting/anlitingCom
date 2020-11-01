import fs from              'fs'
import core from            '@anliting/core'
import HttpServer from      './Server/HttpServer.mjs'
import IpcServer from       './Server/IpcServer.mjs'
async function load(){
    this._ipcServer=new IpcServer
    let ipcServerListen=this._ipcServer.listen()
    this._ipcServer.out=s=>{
        console.log(''+s)
    }
    async function readListen(path){
        try{
            return(
                ''+await fs.promises.readFile(path)
            ).split('\n')[0].split(' ')
        }catch(e){
            if(!(e.code=='ENOENT'))
                throw e
        }
    }
    let
        httpListen=readListen('httpListen'),
        httpListenOnPath=core.existFile('httpListenOnPath')
    this._tls=await core.existFile('tls')
    this._httpServer=new HttpServer(
        this._mainDir,
        this._tls
    )
    if(this._tls){
        this._interval=setInterval(async()=>{
            this._loadTls()
        },86400e3)
        await this._loadTls()
    }
    await Promise.all([
        ipcServerListen,
        (async()=>{
            if(httpListen=await httpListen)
                this._httpServer.listen(httpListen)
        })(),
        (async()=>{
            if(await httpListenOnPath)
                this._httpServer.listen(['httpServer'])
        })(),
    ])
}
function Server(mainDir){
    this._mainDir=mainDir
    this._load=load.call(this)
}
Server.prototype._loadTls=async function(){
    let[key,crt]=await Promise.all([
        fs.promises.readFile('tls/key'),
        fs.promises.readFile('tls/crt'),
    ])
    this._httpServer.setSecureContext({key,cert:crt})
}
Server.prototype.end=async function(){
    await this._load
    if(this._tls)
        clearInterval(this._interval)
    await Promise.all([
        this._ipcServer.end(),
        this._httpServer.end(),
    ])
}
export default Server
