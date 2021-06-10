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
function message(session,doc,message,operationCode){
    if(operationCode==2)
        putUser.call(this,session,doc,message)
}
export default message
