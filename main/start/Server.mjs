import fs from              'fs'
import core from            '@anliting/core'
import Database from        './Server/Database.mjs'
import HttpServer from      './Server/HttpServer.mjs'
import IpcServer from       './Server/IpcServer.mjs'
async function load(){
    this._database=new Database
    this._ipcServer=new IpcServer
    this._ipcServer.out=async b=>{
        await this._load
        switch(b.readUInt8()){
            case 0:
                this._reloadTls=(async()=>{
                    await this._reloadTls
                    this._loadTls()
                })()
                break
            case 1:
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
    await this._database.load
    await Promise.all([
        this._ipcServer.listen(),
        (async()=>{
            if(httpListen=await httpListen)
                await this._httpServer.listen(httpListen)
        })(),
        (async()=>{
            if(await httpListenOnPath)
                await this._httpServer.listen(['httpServer'])
        })(),
    ])
}
function Server(mainDir){
    this._mainDir=mainDir
    this._reloadTls=this._load=load.call(this)
}
Server.prototype._loadHttpTls=async function(){
    let[key,crt]=await Promise.all([
        fs.promises.readFile('httpTls/key'),
        fs.promises.readFile('httpTls/crt'),
    ])
    this._httpServer.setSecureContext({key,cert:crt})
}
Server.prototype.end=async function(){
    await this._load
    await this._ipcServer.end()
    await this._reloadTls
    await this._httpServer.end()
    await this._database.end()
}
export default Server
