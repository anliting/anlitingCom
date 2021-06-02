/*
    interruptedByConnectionClose:
        cutCurrentUser
        putUser
*/
import Connection from  './Site/Connection.mjs'
import Stream from      './Stream.mjs'
import Variable from    './Variable.mjs'
import chatSite from    './Site/chatSite.mjs'
function Site(){
    this._toSend=[]
    this.in=(new Stream).out(a=>{
        switch(a[0]){
            case'cutCurrentUser':
            case'listenMessageList':
            case'listenRoomList':
            case'putMessage':
            case'putRoom':
            case'putUser':
                this._send(a)
            break
            case'logIn':
                this._send(a)
                this.credential=1
                this.userId=a[1]
                this.out.in(['credential'])
            break
            case'logOut':
                this._send(['logOut'])
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
                        this._connection=undefined
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
                if(this._connection==con)
                    this.out.in(['connectionStatus',1])
            })()
        }else if(from&&!to){
            if(this._connection){
                this._connection=undefined
                this.out.in(['connectionStatus',0])
            }
        }
    })
}
Site.prototype._send=async function(a){
    this._toSend.push(a)
    if(this._toSend.length==1){
        await this._connection.load
        this._toSend.map(async a=>{
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
                chatSite.putMessage(this._connection,a[1],a[2])
            if(a[0]=='putRoom')
                chatSite.putRoom(this._connection)
            if(a[0]=='putUser')
                a[2](await this._connection.putUser(a[1]))
        })
        this._toSend=[]
    }
}
Site.prototype.end=function(){
    if(this._connection)
        this._connection.end()
}
export default Site
