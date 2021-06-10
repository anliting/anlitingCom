async function pushUser(id,cb){
    let user=await this._database.getUser(id)
    if(user)
        cb([1,{
            name:user.name||'',
        }])
    else
        cb([0])
}
function pushUserForAllSession(id){
    for(let doc of this._session.values())
    for(let listenUser of doc.listenUser)
    if(listenUser[0]==id)
        pushUser.call(this,...listenUser)
}
function call(session,doc,a){
    switch(a[0]){
        case'chat':
            this._chat.message(session,doc,a[1],a[2])
        break
        case'cutCurrentUser':
            doc.ready=(async()=>{
                await doc.ready
                if(!(
                    doc.user!=undefined
                ))
                    return
                await this._database.cutUser(doc.user)
                pushUserForAllSession.call(this,doc.user)
                for(let s of this._session)
                if(s[1].user==doc.user){
                    s[1].user=undefined
                    s[0].logOut()
                }
                a[1]()
            })()
        break
        case'getOwn':
            doc.ready=(async()=>{
                await doc.ready
                if(!(
                    doc.user!=undefined
                ))
                    return
                a[1](this._database.getOwn(doc.user))
            })()
        break
        case'listenUserProfile':
            doc.ready=(async()=>{
                await doc.ready
                doc.listenUser.set(a[1],a[2])
                pushUser.call(this,a[1],a[2])
            })()
        break
        case'unlistenUserProfile':
            doc.ready=(async()=>{
                await doc.ready
                doc.listenUser.delete(a[1])
                a[2]()
            })()
        break
        case'logIn':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
                    await this._chat.call(session,doc,['logOut'])
                    doc.user=undefined
                    session.logOut()
                }
                if(await this._database.testCredential(a[1],a[2]))
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
        case'putUser':
            doc.ready=(async()=>{
                await doc.ready
                a[2](this._database.putUser(a[1]))
            })()
        break
        case'setOwn':
            doc.ready=(async()=>{
                await doc.ready
                if(!(
                    doc.user!=undefined
                ))
                    return
                await this._database.setOwn(doc.user,a[1])
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
