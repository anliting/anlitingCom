import fs from              'fs'
import core from            '@anliting/core'
import Database from        './Database.mjs'
import HttpServer from      './HttpServer.mjs'
import IpcServer from       './IpcServer.mjs'
import WsSite from          './WsSite.mjs'
import putSession from      './putSession.mjs'
import loadSubmodule from   './loadSubmodule.mjs'
async function load(){
    this._session=new Map
    this._database=new Database
    loadSubmodule.call(this)
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
                    let id=await this._user._database.putSuperUser(
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
            this._unreferSession(session)
        },  
    }   
    if(this._httpTls)
        await this._loadHttpTls()
    if(this._wsTls)
        await this._loadWsTls()
    await this._chat.load
    await Promise.all([
        this._ipcServer.listen(),
        this._httpServer.listen([
            process.env.httpListenPort,
            process.env.httpListenHostname
        ]),
        this._wsSite.listen([
            process.env.wsListenPort,
            process.env.wsListenHostname
        ]),
    ])
}
export default load
