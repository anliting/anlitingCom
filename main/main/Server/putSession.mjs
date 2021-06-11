function putSession(session){
    this._session.set(session,{
        listenUser:new Map,
    })
    this._chat.putSession(session)
    this._user.putSession(session)
    session.out.out(a=>{
        this['_'+a[0]].message(
            session,this._session.get(session),a[1],a[2]
        )
    })
}
export default putSession
