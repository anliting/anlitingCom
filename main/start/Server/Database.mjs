import fs from'fs'
import afs from'@anliting/fs'
import rmrf from'rmrf'
let edge={
    '0':async function(){
        await fs.promises.mkdir('data-next/tmp')
        await fs.promises.mkdir('data-next/user')
        await fs.promises.mkdir('data-next/user/user')
        await Promise.all([
            afs.fsyncByPath('data-next'),
            afs.fsyncByPath('data-next/tmp'),
            afs.fsyncByPath('data-next/user'),
            afs.fsyncByPath('data-next/user/user'),
        ])
        return'1'
    },
}
async function getVersion(){
    try{
        return['pre',
            await fs.promises.readFile('data-next/version','utf8')
        ]
    }catch(e){
        if(!(e.code=='ENOENT'))
            throw e
    }
    try{
        return[0,
            await fs.promises.readFile('data/version','utf8')
        ]
    }catch(e){
        if(!(e.code=='ENOENT'))
            throw e
    }
    return[0,'0']
}
async function setVersion(v){
    await fs.promises.writeFile('data-next/tmp/version',v)
    await afs.fsyncByPath('data-next/tmp/version')
    await fs.promises.rename('data-next/tmp/version','data-next/version')
    await afs.fsyncByPath('data-next')
}
async function load(){
    for(;;){
        let v=await getVersion()
        if(v[0]=='pre'){
            await rmrf('data')
            await fs.promises.rename('data-next','data')
            await afs.fsyncByPath('.')
            continue
        }
        if(v[1] in edge){
            await rmrf('data-next')
            await afs.mkdirFsync('data-next')
            await setVersion(await edge[v[1]]())
            continue
        }
        break
    }
}
function Database(){
    this.load=this._ready=load.call(this)
    this._nextTempPath=0
}
Database.prototype._cutTempPath=function(path){
}
Database.prototype._putTempPath=function(){
    return''+this._nextTempPath++
}
Database.prototype.end=function(){
    return this._ready
}
Database.prototype.getOwn=function(user){
    return this._ready=(async()=>{
        await this._ready
        try{
            return await fs.promises.readFile(`data/user/user/${user}/own`)
        }catch(e){
            if(e.code=='ENOENT')
                return Buffer.from(JSON.stringify([]))
            throw e
        }
    })()
}
Database.prototype.setOwn=function(user,buffer){
    return this._ready=(async()=>{
        await this._ready
        return fs.promises.writeFile(`data/user/user/${user}/own`,buffer)
    })()
}
Database.prototype.setPassword=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        let passwordPath=`data/user/user/${user}/password`
        let tempPath=this._putTempPath()
        await fs.promises.writeFile(`data/tmp/${tempPath}`,password)
        await afs.fsyncByPath(`data/tmp/${tempPath}`)
        await fs.promises.rename(`data/tmp/${tempPath}`,passwordPath)
        await afs.fsyncByPath(passwordPath)
        this._cutTempPath(tempPath)
    })()
}
Database.prototype.testCredential=function(user,password){
    return this._ready=(async()=>{
        await this._ready
        let
            userPath=`data/user/user/${user}`,
            passwordPath=`${userPath}/password`
        try{
            return!(
                await fs.promises.readFile(passwordPath)
            ).compare(password)
        }catch(e){
            if(e.code=='ENOENT')
                return 0
            throw e
        }
    })()
}
export default Database
