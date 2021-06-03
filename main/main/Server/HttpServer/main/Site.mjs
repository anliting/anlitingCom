import Stream from      './Stream.mjs'
import Variable from    './Variable.mjs'
import Connection from  './Site/Connection.mjs'
import chatSite from    './Site/chatSite.mjs'
function setVariable(o,k,f){
    let s=Symbol()
    Object.defineProperty(o,k,{set(v){
        f.call(this,v,this[s])
        this[s]=v
    }})
}
async function send(m){
    let a=m.mission
    if(a[0]=='cutCurrentUser'){
        m.status='sent'
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
function inConnection(){
    this._connectionStatus=1
    this._mission.map(a=>{
        if(a.status==0)
            send.call(this,a)
    })
}
function outConnection(){
    this._connection=0
    this._connectionStatus=0
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
    this.onLine=(new Variable).for((to,from)=>{
        this._toConnect=to&&!this._connectionStatus
    })
}
setVariable(Site.prototype,'_connectionStatus',function(v){
    this._toConnect=this.onLine.value&&!v
})
setVariable(Site.prototype,'_toConnect',function(to,from){
    if(!from&&to)
        this._connectInterval=setInterval(()=>{
            if(this._connection)
                return
            let start=performance.now()
            this._connection=new Connection
            let con=this._connection
            this._connection.out={
                close:()=>{
                    if(this._connection!=con)
                        return
                    outConnection.call(this)
                    this.out.in(['connectionStatus',0])
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
                inConnection.call(this)
                this.out.in(['connectionStatus',1])
            })()
        },1e3)
    else if(from&&!to)
        clearInterval(this._connectInterval)
})
Site.prototype.end=function(){
    if(this._connection)
        this._connection.end()
}
export default Site
