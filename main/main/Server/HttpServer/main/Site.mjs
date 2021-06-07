import Stream from      './Stream.mjs'
import Connection from  './Site/Connection.mjs'
import chatSite from    './Site/chatSite.mjs'
function setVariable(o,k,f){
    let s=Symbol()
    Object.defineProperty(o,k,{get(){
        return this[s]
    },set(v){
        f.call(this,v,this[s])
        this[s]=v
    }})
}
async function connect(){
    if(this._connection)
        return
    this._connection=new Connection
    let con=this._connection
    this._connection.out={
        close:()=>{
            if(this._connection!=con)
                return
            this._connection=0
            this._connectionStatus=0
            this.out.in(['connectionStatus',0])
        },
        logOut:()=>{
            if(this.credential){
                this.credential=0
                this.out.in(['credential'])
            }
        },
    }
    await con.load
    if(this._connection!=con)
        return
    this._connectionStatus=1
    this._mission.map(a=>{
        if(a.status==0)
            send.call(this,a)
    })
    this.out.in(['connectionStatus',1])
}
async function send(m){
    let a=m.mission
    if(a[0]=='cutCurrentUser'){
        m.status='sent'
        await this._connection.cutCurrentUser()
        a[1]()
    }
    if(a[0]=='invite'){
        m.status='sent'
        chatSite.invite(this._connection,a[1],a[2],a[3])
    }
    if(a[0]=='leave'){
        m.status='sent'
        chatSite.leave(this._connection,a[1],a[2])
    }
    if(a[0]=='listenRoomList')
        chatSite.listenRoomList(this._connection,a[1])
    if(a[0]=='listenMessageList')
        chatSite.listenMessageList(this._connection,a[1],a[2])
    if(a[0]=='listenUserProfile')
        this._connection.listenUserProfile(a[1],a[2])
    if(a[0]=='logIn')
        this._connection.logIn(a[1],a[2])
    if(a[0]=='logOut')
        this._connection.logOut()
    if(a[0]=='putMessage'){
        m.status='sent'
        chatSite.putMessage(this._connection,a[1],a[2],a[3])
    }
    if(a[0]=='putRoom'){
        m.status='sent'
        chatSite.putRoom(this._connection,a[1])
    }
    if(a[0]=='putUser'){
        m.status='sent'
        a[2](await this._connection.putUser(a[1]))
    }
}
function Site(){
    this._mission=[]
    this.in=(new Stream).out(a=>{
        let mission={mission:a,status:0}
        this._mission.push(mission)
        if(this._connectionStatus)
            send.call(this,mission)
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
}
setVariable(Site.prototype,'_connectionStatus',function(v){
    this._toConnect=this.onLine&&!v
})
setVariable(Site.prototype,'_toConnect',function(to,from){
    if(!from&&to){
        connect.call(this)
        this._connectInterval=setInterval(connect.bind(this),1e3)
    }else if(from&&!to)
        clearInterval(this._connectInterval)
})
setVariable(Site.prototype,'onLine',function(to){
    this._toConnect=to&&!this._connectionStatus
})
Site.prototype.end=function(){
    if(this._connection)
        this._connection.end()
}
export default Site
