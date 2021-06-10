function putUser(session,doc,message){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        let buf=Buffer.allocUnsafe(4)
        buf.writeUInt32BE(
            await this._database.putUser(message.slice(1))
        )
        session.reply(i,buf)
    })()
}
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
        let chatDoc=this._session.get(session)
        chatDoc.listenMessageList=[roomId,reply]
        reply(this.roomMessage[roomId])
    })()
}
function listenRoomList(session,doc){
    let i=session.get(),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    }
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        let chatDoc=this._session.get(session)
        chatDoc.listenRoomList=[doc.user,reply]
        reply(this.room.array.filter(a=>
            a.user.includes(doc.user)
        ))
    })()
}
function unlistenRoomList(session,doc){
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        let chatDoc=this._session.get(session)
        chatDoc.listenRoomList=0
    })()
}
function message(session,doc,message,operationCode){
    if(operationCode==2)
        putUser.call(this,session,doc,message)
    if(operationCode==17)
        listenRoomList.call(this,session,doc)
    if(operationCode==19)
        listenMessageList.call(this,session,doc,message)
    if(operationCode==21)
        leave.call(this,session,doc,message)
}
export default message
