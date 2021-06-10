/*
    data/tmp: for upload
*/
import core from                    '@anliting/core'
import fs from                      'fs'
import rmrf from                    'rmrf'
import AtomicDirectoryUpdater from  './Database/AtomicDirectoryUpdater.mjs'
async function load(){
    if(!await core.existFile('data')){
        await rmrf('data-next')
        await fs.promises.mkdir('data-next')
        await fs.promises.mkdir('data-next/tmp')
        await fs.promises.rename('data-next','data')
    }
    this._atomicDirectoryUpdater=new AtomicDirectoryUpdater
    await this._atomicDirectoryUpdater.next()
}
function Database(){
    this._ready=this.load=load.call(this)
}
Database.prototype.end=function(){
    return this._ready
}
Database.prototype.update=function(a){
    return this._ready=(async()=>{
        await this._ready
        return this._atomicDirectoryUpdater.update(a)
    })()
}
export default Database
