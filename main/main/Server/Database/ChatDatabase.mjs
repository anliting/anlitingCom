import fs from'fs'
import AtomicDirectoryUpdater from'./AtomicDirectoryUpdater.mjs'
function ChatDatabase(ready){
    this._ready=ready
    this._atomicDirectoryUpdater=new AtomicDirectoryUpdater
}
ChatDatabase.prototype._getRoom=async function(){
    return JSON.parse(
        await fs.promises.readFile(`data/chat/room/main`)
    )
}
ChatDatabase.prototype._getRoomMain=async function(room){
    return JSON.parse(await fs.promises.readFile(
        `data/chat/room/room/${room}/main`
    ))
}
ChatDatabase.prototype.getRoom=function(){
    return this._ready=(async()=>{
        await this._ready
        return this._getRoom()
    })()
}
ChatDatabase.prototype.getRoomMessage=async function(room){
    return this._ready=(async()=>{
        await this._ready
        let main=await this._getRoomMain(room)
        let result=[]
        for(let i=0;i<main.index;i++)
            result[i]=JSON.parse(await fs.promises.readFile(
                `data/chat/room/room/${room}/message/${i}`
            ))
        return result
    })()
}
ChatDatabase.prototype.putRoomMessage=function(room,user,content){
    return this._ready=(async()=>{
        await this._ready
        let main=await this._getRoomMain(room)
        let id=main.index++
        await this._atomicDirectoryUpdater.update([
            [0,`data/chat/room/room/${room}/main`,JSON.stringify(main)],
            [
                0,
                `data/chat/room/room/${room}/message/${id}`,
                JSON.stringify({
                    user,
                    content,
                })
            ],
        ])
    })()
}
ChatDatabase.prototype.putRoom=function(user){
    return this._ready=(async()=>{
        await this._ready
        let
            room=await this._getRoom(),
            id=room.index
        room.array.push({
            id,
            user:[user],
        })
        room.index++
        await this._atomicDirectoryUpdater.update([
            [0,`data/chat/room/main`,JSON.stringify(room)],
            [1,`data/chat/room/room/${id}`],
            [0,`data/chat/room/room/${id}/main`,JSON.stringify({
                index:0,
            })],
            [1,`data/chat/room/room/${id}/message`],
        ])
        return id
    })()
}
ChatDatabase.prototype.setRoomList=function(doc){
    return this._ready=(async()=>{
        await this._ready
        await this._atomicDirectoryUpdater.update([
            [0,`data/chat/room/main`,JSON.stringify(doc)],
        ])
    })()
}
export default ChatDatabase
