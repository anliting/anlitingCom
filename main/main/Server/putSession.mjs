async function call(session,doc,a){
    switch(a[0]){
        case'cutCurrentUser':
            if(!(
                doc.user!=undefined
            ))
                return
            await this._database.cutUser(doc.user)
            doc.user=undefined
            session.logOut()
            a[1]()
        break
        case'getOwn':
            if(!(
                doc.user!=undefined
            ))
                return
            a[1](this._database.getOwn(doc.user))
        break
        case'invite':
        case'leave':
        case'listenMessageList':
        case'listenRoomList':
        case'putMessage':
        case'putRoom':
        case'unlistenRoomList':
            await this._chat.call(session,doc,a)
        break
        case'logIn':
            if(doc.user!=undefined){
                await this._chat.stream.call(this,session,doc,a)
                doc.user=undefined
                session.logOut()
            }
            if(await this._database.testCredential(a[1],a[2]))
                doc.user=a[1]
            else
                session.logOut()
        break
        case'logOut':
            if(!(
                doc.user!=undefined
            ))
                return
            await this._chat.call(session,doc,a)
            doc.user=undefined
            session.logOut()
        break
        case'putUser':
            a[2](this._database.putUser(a[1]))
        break
        case'setOwn':
            if(!(
                doc.user!=undefined
            ))
                return
            await this._database.setOwn(doc.user,a[1])
        break
    }
}
function lockCall(session,a){
    let doc=this._session.get(session)
    doc.ready=(async()=>{
        await doc.ready
        await call.call(this,session,doc,a)
    })()
}
function putSession(session){
    this._session.set(session,{})
    this._chat.putSession(session)
    session.outStream.out(a=>{
        lockCall.call(this,session,a)
    })
}
export default putSession
