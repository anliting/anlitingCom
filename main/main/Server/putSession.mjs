function call(session,doc,a){
    switch(a[0]){
        case'chat':
            this._chat.message(session,doc,a[1],a[2])
        break
        case'user':
            this._user.message(session,doc,a[1],a[2])
        break
        case'logIn':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
                    await this._chat.call(session,doc,['logOut'])
                    doc.user=undefined
                    session.logOut()
                }
                if(await this._user._database.testCredential(a[1],a[2]))
                    doc.user=a[1]
                else
                    session.logOut()
            })()
        break
        case'logOut':
            doc.ready=(async()=>{
                await doc.ready
                if(!(
                    doc.user!=undefined
                ))
                    return
                await this._chat.call(session,doc,a)
                doc.user=undefined
                session.logOut()
            })()
        break
    }
}
function putSession(session){
    this._session.set(session,{
        listenUser:new Map,
    })
    this._chat.putSession(session)
    session.out.out(a=>{
        call.call(this,session,this._session.get(session),a)
    })
}
export default putSession
