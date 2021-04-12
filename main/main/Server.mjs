import fs from              'fs'
import core from            '@anliting/core'
import Database from        './Server/Database.mjs'
import HttpServer from      './Server/HttpServer.mjs'
import IpcServer from       './Server/IpcServer.mjs'
import WsSite from          './Server/WsSite.mjs'
import putSession from      './Server/putSession.mjs'
async function load(){
    this._session=new Map
    this._database=new Database
    this._ipcServer=new IpcServer
    this._ipcServer.out=async b=>{
        await this._load
        switch(b.readUInt8()){
            case 0:
                return this._reloadTls=(async()=>{
                    await this._reloadTls
                    this._loadHttpTls()
                    this._loadWsTls()
                })()
                break
            case 1:
                {
                    let
                        passwordLength=b.readUInt32BE(1),
                        password=''+b.slice(1+4,1+4+passwordLength)
                    let id=await this._database.putSuperUser(
                        password
                    )
                    let buffer=Buffer.allocUnsafe(4)
                    buffer.writeUInt32BE(id,0)
                    return buffer
                }
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
        httpListenOnPath=core.existFile('httpListenOnPath'),
        wsListen=readListen('wsListen'),
        wsListenOnPath=core.existFile('wsListenOnPath'),
        wsEndListen=readListen('wsEndListen')
    this._httpTls=await core.existFile('httpTls')
    this._wsTls=await core.existFile('wsTls')
    this._httpServer=new HttpServer(
        this._mainDir,
        this._httpTls,
        await wsEndListen
    )
    this._wsSite=new WsSite(this._wsTls)
    this._wsSite.out={
        putSession:putSession.bind(this),
        cutSession:session=>{
            this._session.delete(session)
        },  
    }   
    if(this._httpTls)
        await this._loadHttpTls()
    if(this._wsTls)
        await this._loadWsTls()
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
        (async()=>{
            if(wsListen=await wsListen)
                await this._wsSite.listen(wsListen)
        })(),
        (async()=>{
            if(await wsListenOnPath)
                await this._wsSite.listen(['wsServer'])
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
Server.prototype._loadWsTls=async function(){
    let[key,crt]=await Promise.all([
        fs.promises.readFile('wsTls/key'),
        fs.promises.readFile('wsTls/crt'),
    ])
    this._wsSite.setSecureContext({key,cert:crt})
}
Server.prototype.end=async function(){
    await this._load
    await this._ipcServer.end()
    await this._reloadTls
    await this._httpServer.end()
    await this._wsSite.end()
    await this._database.end()
}
export default Server
