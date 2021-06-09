async function invite(session,doc,message){
    let i=session.get()
    if(!(
        doc.user!=undefined
    ))
        return
    let
        room=message.readUInt32BE(1),
        user0=doc.user,
        user1=message.readUInt32BE(5)
    await(this._ready=(async()=>{
        await this._ready
        let b=this.room.array.filter(b=>
            b.id==room&&b.user.includes(user0)
        )
        if(!b.length)
            return
        b=b[0]
        let s=new Set(b.user)
        s.add(user1)
        b.user=[...s.keys()]
        await this._database.setRoomList(this.room)
        this._pushRoomList()
    })())
    session.reply(i,Buffer.allocUnsafe(0))
}
export default invite
