function call(session,doc,a){
    switch(a[0]){
        case'chat':
            this._chat.message(session,doc,a[1],a[2])
        break
        case'user':
            this._user.message(session,doc,a[1],a[2])
        break
    }
}
function putSession(session){
    this._session.set(session,{
        listenUser:new Map,
    })
    this._chat.putSession(session)
    this._user.putSession(session)
    session.out.out(a=>{
        call.call(this,session,this._session.get(session),a)
    })
}
export default putSession
