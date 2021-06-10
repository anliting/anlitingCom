import core from    '@anliting/core'
import fs from      'fs'
import Stream from  '../Stream.mjs'
function Database(ready){
    this._out=(this.out=new Stream).caller
    this._ready=(async()=>{
        await ready
        if(await core.existFile('data/chat'))
            return
        await this._out.update([
            [1,'data/chat'],
            [1,'data/chat/room'],
            [
                0,
                'data/chat/room/main',
                JSON.stringify({
                    index:0,
                    array:[],
                })
            ],
            [1,'data/chat/room/room'],
        ])
    })()
}
Database.prototype._getRoomSetMain=async function(){
    return JSON.parse(
        await fs.promises.readFile(`data/chat/room/main`)
    )
}
Database.prototype._getRoomMain=async function(room){
    return JSON.parse(await fs.promises.readFile(
        `data/chat/room/room/${room}/main`
    ))
}
Database.prototype.getRoom=function(){
    return this._ready=(async()=>{
        await this._ready
        return this._getRoomSetMain()
    })()
}
Database.prototype.getRoomMessage=async function(room){
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
Database.prototype.putRoomMessage=function(room,user,content){
    return this._ready=(async()=>{
        await this._ready
        let main=await this._getRoomMain(room)
        let id=main.index++
        await this._out.update([
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
Database.prototype.putRoom=function(user){
    return this._ready=(async()=>{
        await this._ready
        let
            room=await this._getRoomSetMain(),
            id=room.index
        room.array.push({
            id,
            user:[user],
        })
        room.index++
        await this._out.update([
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
Database.prototype.setRoomList=function(doc){
    return this._ready=(async()=>{
        await this._ready
        await this._out.update([
            [0,`data/chat/room/main`,JSON.stringify(doc)],
        ])
    })()
}
export default Database
