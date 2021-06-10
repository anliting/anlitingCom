function cutCurrentUser(session,doc,connection){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        await this._database.cutUser(doc.user)
        this.out.in(['cutUser',doc.user])
        session.reply(i,Buffer.allocUnsafe(0))
    })()
}
function listenUserProfile(session,doc,message){
    let i=session.get(),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    },id=message.readUInt32BE(1)
    doc.ready=(async()=>{
        await doc.ready
        doc.listenUser.set(id,reply)
        this.pushUser(id,reply)
    })()
}
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
function unlistenUserProfile(session,doc,message){
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        doc.listenUser.delete(message.readUInt32BE(1))
        session.reply(i,Buffer.allocUnsafe(0))
    })()
}
function message(session,doc,message,operationCode){
    if(operationCode==2)
        putUser.call(this,session,doc,message)
    if(operationCode==3)
        cutCurrentUser.call(this,session,doc,message)
    if(operationCode==4)
        listenUserProfile.call(this,session,doc,message)
    if(operationCode==5)
        unlistenUserProfile.call(this,session,doc,message)
}
export default message
