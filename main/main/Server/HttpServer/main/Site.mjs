let textEncoder=new TextEncoder,textDecoder=new TextDecoder
function getWs(){
    let url=new URL(location),x=globalThis.anlitingCom
    url.protocol='wss:'
    url.port=x[0]
    if(x[1])
        url.hostname=`[${x[1]}]`
    return url
}
function Connection(){
    this._port=0
    this._onPort={}
    this._outCredential=0
    this.load=(async()=>{
        this._ws=new WebSocket(getWs())
        this._ws.onmessage=async e=>{
            let
                a=await e.data.arrayBuffer(),
                dataView=new DataView(a),
                operation=dataView.getUint8(0)
            // reply
            if(operation==0){
                let port=dataView.getUint32(1)
                this._onPort[port](new Uint8Array(a,5))
                delete this._onPort[port]
            }
            // syncLoggedOut
            if(operation==1){
                if(--this._outCredential==0)
                    this.out.logOut()
            }
        }
        await new Promise(rs=>
            this._ws.onopen=rs
        )
    })()
}
Connection.prototype.end=function(){
    this._ws.close()
}
Connection.prototype.logIn=function(user,password){
    password=textEncoder.encode(password)
    let
        buf=new ArrayBuffer(5+password.length),
        dataView=new DataView(buf),
        array=new Uint8Array(buf)
    dataView.setUint8(0,0)
    dataView.setUint32(1,user)
    array.set(password,5)
    this._ws.send(buf)
    this._outCredential++
}
Connection.prototype.logOut=function(){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,1)
    this._ws.send(buf)
}
/*Connection.prototype.getOwn=function(){
    let port=this._port++,buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,6)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=rs
    )
}
Connection.prototype.setOwn=async function(own){
    own=new Uint8Array(await own.arrayBuffer())
    let
        port=this._port++,
        buf=new ArrayBuffer(1+own.length),
        dataView=new DataView(buf),
        array=new Uint8Array(buf)
    dataView.setUint8(0,5)
    array.set(own,1)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=rs
    )
}*/
function Site(){
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
}
Site.prototype._send=async function(a){
    this._toSend.push(a)
    if(this._toSend.length==1){
        await this._connection.load
        this._toSend.map(a=>{
            if(a[0]=='logIn'){
                this._connection.logIn(a[1],a[2])
            }
            if(a[0]=='logOut'){
                this._connection.logOut()
            }
        })
        this._toSend=[]
    }
}
Site.prototype.end=function(){
    this._connection.end()
}
Site.prototype.logIn=function(user,password){
    this._send(['logIn',user,password])
    this.credential=1
    this.out.credential()
}
Site.prototype.logOut=function(){
    this._send(['logOut'])
    this.credential=0
    this.out.credential()
}
export default Site
