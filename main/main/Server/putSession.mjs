import chatStream from './putSession/chatStream.mjs'
function stream(session,a){
    let doc=this._session.get(session)
    switch(a[0]){
        case'cutCurrentUser':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await this._database.cutUser(doc.user)
                doc.user=undefined
                session.logOut()
                a[1]()
            })()
        break
        case'getOwn':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                a[1](this._database.getOwn(doc.user))
            })()
        break
        case'listenMessageList':
        case'listenRoomList':
        case'putMessage':
        case'putRoom':
        case'unlistenRoomList':
            chatStream.call(this,session,a)
        break
        case'logIn':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
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
                if(doc.user!=undefined){
                    doc.listenRoomList=0
                    doc.user=undefined
                    session.logOut()
                }
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
                if(doc.user==undefined)
                    return
                await this._database.setOwn(doc.user,a[1])
                a[2]()
            })()
        break
    }
}
function putSession(session){
    let doc={}
    this._session.set(session,doc)
    session.outStream.out(a=>{
        stream.call(this,session,a)
    })
}
export default putSession
