/*
    interruptedByConnectionClose:
        cutCurrentUser
        putMessage
        putRoom
        putUser
    synchronous:
        listenMessageList
        listenRoomList
        logIn
        logOut
*/
import Connection from  './Site/Connection.mjs'
import Stream from      './Stream.mjs'
import Variable from    './Variable.mjs'
import chatSite from    './Site/chatSite.mjs'
async function send(a){
    if(a[0]=='cutCurrentUser'){
        await this._connection.cutCurrentUser()
        a[1]()
    }
    if(a[0]=='listenRoomList')
        chatSite.listenRoomList(this._connection,a[1])
    if(a[0]=='listenMessageList')
        chatSite.listenMessageList(this._connection,a[1],a[2])
    if(a[0]=='logIn')
        this._connection.logIn(a[1],a[2])
    if(a[0]=='logOut')
        this._connection.logOut()
    if(a[0]=='putMessage')
        chatSite.putMessage(this._connection,a[1],a[2],a[3])
    if(a[0]=='putRoom')
        chatSite.putRoom(this._connection,a[1])
    if(a[0]=='putUser')
        a[2](await this._connection.putUser(a[1]))
}
function Site(){
    this._toSend=[]
    this.in=(new Stream).out(a=>{
        if(this._connectionStatus)
            send.call(this,a)
        else
            this._toSend.push(a)
        switch(a[0]){
            case'logIn':
                this.credential=a.slice(1)
                this.out.in(['credential'])
            break
            case'logOut':
                this.credential=0
                this.out.in(['credential'])
            break
        }
    })
    this.out=new Stream
    this.onLine=(new Variable).for((to,from)=>{
        if(!from&&to){
            this._connection=new Connection
            let con=this._connection
            this._connection.out={
                close:()=>{
                    if(this._connection==con){
                        this._connection=0
                        this._connectionStatus=0
                        this.out.in(['connectionStatus',0])
                    }
                },
                logOut:()=>{
                    if(this.credential){
                        this.credential=0
                        this.out.in(['credential'])
                    }
                },
            }
            ;(async()=>{
                let con=this._connection
                await con.load
                if(this._connection!=con)
                    return
                this._connectionStatus=1
                this.out.in(['connectionStatus',1])
                this._toSend.map(send.bind(this))
                this._toSend=[]
            })()
        }else if(from&&!to){
            if(this._connection){
                this._connection=0
                this._connectionStatus=0
                this.out.in(['connectionStatus',0])
            }
        }
    })
}
Site.prototype.end=function(){
    if(this._connection)
        this._connection.end()
}
export default Site
