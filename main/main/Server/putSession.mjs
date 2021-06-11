function putSession(session){
    this._session.set(session,{
        referCount:0,
        listenUser:new Map,
    })
    this._referSession(session)
    session.refer=()=>{
        this._referSession(session)
    }
    session.unrefer=()=>{
        this._unreferSession(session)
    }
    this._chat.putSession(session)
    session.out.out(a=>{
        this['_'+a[0]].message(
            session,this._session.get(session),a[1],a[2]
        )
    })
}
export default putSession
