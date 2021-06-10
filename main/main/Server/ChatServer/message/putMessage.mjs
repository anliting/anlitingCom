function putMessage(session,doc,message){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        let
            room=message.readUInt32BE(1),
            user=doc.user,
            targetMessage=''+message.slice(5)
        await(this._ready=(async()=>{
            await this._ready
            if(!(
                this.room.array.some(b=>
                    b.id==room&&b.user.includes(user)
                )
            ))
                return
            await this._database.putRoomMessage(
                room,user,targetMessage
            )
            this.roomMessage[room].push({
                user,
                content:targetMessage,
            })
            for(let doc of this._session.values())
                if(doc.listenMessageList)
                    doc.listenMessageList[1](
                        this.roomMessage[
                            doc.listenMessageList[0]
                        ]
                    )
        })())
        session.reply(i,Buffer.allocUnsafe(0))
    })()
}
export default putMessage
