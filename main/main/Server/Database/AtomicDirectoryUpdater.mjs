/*
    This class provide the astraction to do updates on a directory. This
    class is considered as single-threaded; only when all Promise it
    returns are settled, can its methods be called. If the process
    crashes, but the operating system does not, the update is atomic.
*/
import fs from'fs'
import rmrf from'rmrf'
function AtomicDirectoryUpdater(){
}
AtomicDirectoryUpdater.prototype.next=async function(){
    let a
    try{
        a=JSON.parse(''+await fs.promises.readFile('data/next/main'))
    }catch(e){
    }
    if(a){
        let i=0
        for(let b of a){
            let stat,noent
            try{
                stat=await fs.promises.stat(b[1])
            }catch(e){
                if(!(e.code=='ENOENT'))
                    throw e
                noent=1
            }
            if(!noent)
                if(stat.isDirectory())
                    await rmrf(b[1])
                else
                    await fs.promises.unlink(b[1])
            if(b[0]<2){
                await(
                    b[0]==0?
                        fs.promises.link(`data/next/${i++}`,b[1])
                    :
                        fs.promises.mkdir(b[1])
                )
            }
        }
        await fs.promises.unlink('data/next/main')
    }
    await rmrf('data/next')
}
AtomicDirectoryUpdater.prototype.update=async function(a){
    await fs.promises.mkdir('data/next')
    let i=0
    for(let b of a)if(b[0]==0)
        await fs.promises.writeFile(`data/next/${i++}`,b[2])
    await fs.promises.writeFile('data/next/main',JSON.stringify(a))
    await this.next()
}
export default AtomicDirectoryUpdater
