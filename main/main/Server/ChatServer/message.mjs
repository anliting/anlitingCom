import invite from      './message/invite.mjs'
import putMessage from  './message/putMessage.mjs'
function leave(session,doc,message){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        let room=message.readUInt32BE(1),user=doc.user
        await(this._ready=(async()=>{
            await this._ready
            let b=this.room.array.filter(b=>
                b.id==room&&b.user.includes(user)
            )
            if(!b.length)
                return
            b=b[0]
            let s=new Set(b.user)
            s.delete(user)
            b.user=[...s.keys()]
            await this._database.setRoomList(this.room)
            this._pushRoomList()
        })())
        session.reply(i,Buffer.allocUnsafe(0))
    })()
}
function listenMessageList(session,doc,message){
    let chatDoc=this._session.get(session)
    let i=session.get(),roomId=message.readUInt32BE(1),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined&&
            this.room.array.some(a=>
                a.id==roomId&&a.user.includes(doc.user)
            )
        ))
            return
        chatDoc.listenMessageList=[roomId,reply]
        reply(this.roomMessage[roomId])
    })()
}
function listenRoomList(session,doc){
    let chatDoc=this._session.get(session)
    let i=session.get(),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        chatDoc.listenRoomList=[doc.user,reply]
        reply(this.room.array.filter(a=>
            a.user.includes(doc.user)
        ))
    })()
}
function putRoom(session,doc){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        let user=doc.user
        await(this._ready=(async()=>{
            await this._ready
            let room=await this._database.putRoom(user)
            this.room.array.push({
                id:this.room.index++,
                user:[user],
            })
            this.roomMessage[room]=[]
            this._pushRoomList()
        })())
        session.reply(i,Buffer.allocUnsafe(0))
    })()
}
function unlistenRoomList(session,doc){
    let chatDoc=this._session.get(session)
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        chatDoc.listenRoomList=0
    })()
}
function message(session,doc,message,operationCode){
    if(operationCode==16)
        putRoom.call(this,session,doc)
    if(operationCode==17)
        listenRoomList.call(this,session,doc)
    if(operationCode==18)
        putMessage.call(this,session,doc,message)
    if(operationCode==19)
        listenMessageList.call(this,session,doc,message)
    if(operationCode==20)
        invite.call(this,session,doc,message)
    if(operationCode==21)
        leave.call(this,session,doc,message)
}
export default message
