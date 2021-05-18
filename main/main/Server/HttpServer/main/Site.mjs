import Connection from  './Site/Connection.mjs'
import Stream from      './Stream.mjs'
function Site(out){
    this.in=new Stream
    this.out=out
    this._toSend=[]
    this._connection=new Connection
    this._connection.out={
        logOut:()=>{
            if(this.credential){
                this.credential=0
                this.out.credential()
            }
        },
    }
    this.in.out(a=>{
        switch(a[0]){
            case'putRoom':
                this._send(a)
            break
        }
    })
}
Site.prototype._send=async function(a){
    this._toSend.push(a)
    if(this._toSend.length==1){
        await this._connection.load
        this._toSend.map(a=>{
            if(a[0]=='cutCurrentUser')
                a[1](this._connection.cutCurrentUser())
            if(a[0]=='logIn')
                this._connection.logIn(a[1],a[2])
            if(a[0]=='logOut')
                this._connection.logOut()
            if(a[0]=='putRoom')
                this._connection.putRoom()
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
