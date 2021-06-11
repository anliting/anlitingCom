function logIn(session,doc,message){
    session.refer()
    doc.ready=(async()=>{
        await doc.ready
        if(doc.user!=undefined){
            await new Promise(rs=>
                this.out.in(['chatCall',[session,doc,['logOut']],rs])
            )
            doc.user=undefined
            session.logOut()
        }
        let id=message.readUInt32BE(1),password=message.slice(5)
        if(await this._database.testCredential(id,password))
            doc.user=id
        else
            session.logOut()
        session.unrefer()
    })()
}
function logOut(session,doc){
    session.refer()
    doc.ready=(async()=>{
        await doc.ready
        if(!(
            doc.user!=undefined
        ))
            return
        await new Promise(rs=>
            this.out.in(['chatCall',[session,doc,['logOut']],rs])
        )
        doc.user=undefined
        session.logOut()
        session.unrefer()
    })()
}
function cutCurrentUser(session,doc){
    session.refer()
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
        session.unrefer()
    })()
}
function listenUserProfile(session,doc,message){
    session.refer()
    let i=session.get(),reply=a=>{
        session.reply(i,Buffer.from(JSON.stringify(a)))
    },id=message.readUInt32BE(1)
    doc.ready=(async()=>{
        await doc.ready
        doc.listenUser.set(id,reply)
        this.pushUser(id,reply)
        session.unrefer()
    })()
}
function putUser(session,doc,message){
    session.refer()
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        let buf=Buffer.allocUnsafe(4)
        buf.writeUInt32BE(
            await this._database.putUser(message.slice(1))
        )
        session.reply(i,buf)
        session.unrefer()
    })()
}
function unlistenUserProfile(session,doc,message){
    session.refer()
    let i=session.get()
    doc.ready=(async()=>{
        await doc.ready
        doc.listenUser.delete(message.readUInt32BE(1))
        session.reply(i,Buffer.allocUnsafe(0))
        session.unrefer()
    })()
}
function message(session,doc,message,operationCode){
    if(operationCode==0)
        logIn.call(this,session,doc,message)
    if(operationCode==1)
        logOut.call(this,session,doc,message)
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
