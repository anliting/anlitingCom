import Connection from  './Site/Connection.mjs'
import Stream from      './Stream.mjs'
import Variable from    './Variable.mjs'
import chatSite from    './Site/chatSite.mjs'
function Site(out){
    this.in=new Stream
    this.out=out
    this._toSend=[]
    this.in.out(a=>{
        switch(a[0]){
            case'putMessage':
            case'putRoom':
                this._send(a)
            break
        }
    })
    this.onLine=(new Variable).for((to,from)=>{
        if(!from&&to){
            this._connection=new Connection
            let con=this._connection
            this._connection.out={
                close:()=>{
                    if(this._connection==con){
                        this._connection=undefined
                        this.outStream.in(['connectionStatus',0])
                    }
                },
                logOut:()=>{
                    if(this.credential){
                        this.credential=0
                        this.out.credential()
                    }
                },
            }
            ;(async()=>{
                let con=this._connection
                await con.load
                if(this._connection==con)
                    this.outStream.in(['connectionStatus',1])
            })()
        }else if(from&&!to){
            if(this._connection){
                this._connection=undefined
                this.outStream.in(['connectionStatus',0])
            }
        }
    })
    this.outStream=new Stream
}
Site.prototype._send=async function(a){
    this._toSend.push(a)
    if(this._toSend.length==1){
        await this._connection.load
        this._toSend.map(a=>{
            if(a[0]=='cutCurrentUser')
                a[1](this._connection.cutCurrentUser())
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
                a[2](this._connection.putUser(a[1]))
        })
        this._toSend=[]
    }
}
Site.prototype.end=function(){
    this._connection.end()
}
Site.prototype.cutCurrentUser=function(){
    return new Promise(rs=>{
        this._send(['cutCurrentUser',rs])
    })
}
Site.prototype.listenMessageList=function(room,cb){
    this._send(['listenMessageList',room,cb])
}
Site.prototype.listenRoomList=function(cb){
    this._send(['listenRoomList',cb])
}
Site.prototype.logIn=function(user,password){
    this._send(['logIn',user,password])
    this.credential=1
    this.userId=user
    this.out.credential()
}
Site.prototype.logOut=function(){
    this._send(['logOut'])
    this.credential=0
    this.out.credential()
}
Site.prototype.putUser=async function(password){
    return new DataView(await new Promise(rs=>{
        this._send(['putUser',password,rs])
    })).getUint32(0)
}
export default Site
