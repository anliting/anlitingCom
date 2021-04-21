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
                this._onPort[port](a.slice(5))
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
Connection.prototype.cutCurrentUser=async function(){
    let
        port=this._port++,
        buf=new ArrayBuffer(1),
        dataView=new DataView(buf)
    dataView.setUint8(0,3)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=rs
    )
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
Connection.prototype.putUser=async function(password){
    password=textEncoder.encode(password)
    let
        port=this._port++,
        buf=new ArrayBuffer(1+password.length),
        dataView=new DataView(buf),
        array=new Uint8Array(buf)
    dataView.setUint8(0,2)
    array.set(password,1)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=rs
    )
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
export default Connection
