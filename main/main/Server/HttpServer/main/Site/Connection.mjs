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
    this._logIn=[]
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
            }
            // syncLoggedOut
            if(operation==1){
                let logIn=this._logIn.shift()
                logIn.onceLogOut.map(f=>f())
                if(this._logIn.length==0)
                    this.out.logOut()
            }
        }
        this._ws.onclose=e=>
            this.out.close()
        await new Promise(rs=>
            this._ws.onopen=rs
        )
    })()
}
Connection.prototype.cutCurrentUser=function(){
    let
        port=this._port++,
        buf=new ArrayBuffer(1),
        dataView=new DataView(buf)
    dataView.setUint8(0,3)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=()=>{
            delete this._onPort[port]
            rs()
        }
    )
}
Connection.prototype.end=function(){
    this._ws.close()
}
Connection.prototype.listenUserProfile=function(user,cb){
    let
        buf=new ArrayBuffer(5),
        dataView=new DataView(buf)
    dataView.setUint8(0,12)
    dataView.setUint32(1,user)
    this.onPort(this.send(buf,1),a=>{
        cb(JSON.parse(textDecoder.decode(a)))
    })
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
    this._logIn.push({
        onceLogOut:[],
    })
}
Connection.prototype.logOut=function(){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,1)
    this._ws.send(buf)
}
Connection.prototype.putUser=function(password){
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
        this._onPort[port]=a=>{
            delete this._onPort[port]
            rs(new DataView(a).getUint32(0))
        }
    )
}
Connection.prototype.getOwn=function(){
    let port=this._port++,buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,6)
    this._ws.send(buf)
    return new Promise(rs=>
        this._onPort[port]=a=>{
            delete this._onPort[port]
            rs(a)
        }
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
        this._onPort[port]=a=>{
            delete this._onPort[port]
            rs(a)
        }
    )
}
Connection.prototype.send=function(buf,port){
    this._ws.send(buf)
    if(port)
        return this._port++
}
Connection.prototype.onceLogOut=function(f){
    this._logIn[this._logIn.length-1].onceLogOut.push(f)
}
Connection.prototype.onPort=function(port,f){
    this._onPort[port]=f
}
Connection.prototype.offPort=function(port){
    delete this._onPort[port]
}
Connection.prototype.unlistenUserProfile=function(user){
    let
        buf=new ArrayBuffer(5),
        dataView=new DataView(buf)
    dataView.setUint8(0,13)
    dataView.setUint32(1,user)
    this.onPort(this.send(buf,1),()=>{
    })
}
export default Connection
