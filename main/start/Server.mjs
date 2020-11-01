import fs from              'fs'
import core from            '@anliting/core'
import HttpServer from      './Server/HttpServer.mjs'
import IpcServer from       './Server/IpcServer.mjs'
async function load(){
    this._ipcServer=new IpcServer
    let ipcServerListen=this._ipcServer.listen()
    this._ipcServer.out=b=>{
        if(this._loadedStatus&&this._endStatus)
            return
        switch(b.readUInt8()){
            case 0:
                this._readyToReloadTls=(async()=>{
                    await this._readyToReloadTls
                    this._loadTls()
                })()
                break
        }
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
    this._httpTls=await core.existFile('httpTls')
    this._httpServer=new HttpServer(this._mainDir,this._httpTls)
    if(this._httpTls)
        await this._loadHttpTls()
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
    this._loadStatus=1
}
function Server(mainDir){
    this._mainDir=mainDir
    this._loadStatus=this._endStatus=0
    this._readyToReloadTls=this._load=load.call(this)
}
Server.prototype._loadHttpTls=async function(){
    let[key,crt]=await Promise.all([
        fs.promises.readFile('httpTls/key'),
        fs.promises.readFile('httpTls/crt'),
    ])
    this._httpServer.setSecureContext({key,cert:crt})
}
Server.prototype.end=async function(){
    this._endStatus=1
    await Promise.all([
        this._load,
        this._readyToReloadTls,
    ])
    await Promise.all([
        this._ipcServer.end(),
        this._httpServer.end(),
    ])
}
export default Server
