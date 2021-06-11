import fs from              'fs'
import load from            './Server/load.mjs'
function Server(mainDir){
    this._mainDir=mainDir
    this._reloadTls=this._load=load.call(this)
}
Server.prototype._referSession=function(session){
    this._session.get(session).referCount++
}
Server.prototype._unreferSession=function(session){
    if(!--this._session.get(session).referCount){
        this._chat.cutSession(session)
        this._session.delete(session)
    }
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
    await Promise.all([
        this._chat.end(),
        this._user.end(),
    ])
    await this._database.end()
}
export default Server
