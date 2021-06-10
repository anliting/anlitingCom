import ChatServer from      './ChatServer.mjs'
import UserServer from      './UserServer.mjs'
function pushUserForAllSession(id){
    for(let doc of this._session.values())
    for(let listenUser of doc.listenUser)
    if(listenUser[0]==id)
        this._user.pushUser(...listenUser)
}
function loadSubmodule(){
    this._chat=new ChatServer
    this._chat.out.out(a=>{
        switch(a[0]){
            case'update':
                this._database.update(a[1]).then(a[2])
            break
        }
    })
    this._user=new UserServer
    this._user.out.out(async a=>{
        switch(a[0]){
            case'chatCall':
                this._chat.call(...a[1])
                a[2]()
            break
            case'cutUser':
                pushUserForAllSession.call(this,a[1])
                for(let s of this._session)
                if(s[1].user==a[1]){
                    this._chat.call(...s,['logOut'])
                    s[1].user=undefined
                    s[0].logOut()
                }
            break
            case'update':
                this._database.update(a[1]).then(a[2])
            break
        }
    })
    ;(async()=>{
        await this._database.load
        this._chat.loadDatabase()
        this._user.loadDatabase()
    })()
}
export default loadSubmodule
