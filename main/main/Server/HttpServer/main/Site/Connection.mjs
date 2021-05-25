let textEncoder=new TextEncoder,textDecoder=new TextDecoder
// pass connection, handle mission, prevent collision
let chat={}
chat.listenMessageList=function(ws,room){
    let
        buf=new ArrayBuffer(5),
        dataView=new DataView(buf)
    dataView.setUint8(0,9)
    dataView.setUint32(1,room)
    ws.send(buf)
}
chat.listenRoomList=function(ws){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,7)
    ws.send(buf)
}
chat.putRoom=function(ws){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,4)
    ws.send(buf)
}
chat.putMessage=function(ws,room,message){
    message=textEncoder.encode(message)
    let
        buf=new ArrayBuffer(5+message.length),
        dataView=new DataView(buf),
        array=new Uint8Array(buf)
    dataView.setUint8(0,8)
    dataView.setUint32(1,room)
    array.set(message,5)
    ws.send(buf)
}
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
    this._onceLogOut=[]
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
                this._onceLogOut.map(f=>f())
                if(--this._outCredential==0)
                    this.out.logOut()
            }
        }
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
        this._onPort[port]=a=>{
            delete this._onPort[port]
            rs(a)
        }
    )
}
Connection.prototype.end=function(){
    this._ws.close()
}
Connection.prototype.listenMessageList=function(room,cb){
    let port=this._port++
    chat.listenMessageList(this._ws,room)
    this._onPort[port]=a=>{
        cb(JSON.parse(textDecoder.decode(a)))
    }
    this._onceLogOut.push(()=>{
        delete this._onPort[port]
    })
}
Connection.prototype.listenRoomList=function(cb){
    let port=this._port++
    chat.listenRoomList(this._ws)
    this._onPort[port]=a=>{
        cb(JSON.parse(textDecoder.decode(a)))
    }
    this._onceLogOut.push(()=>{
        delete this._onPort[port]
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
    this._outCredential++
}
Connection.prototype.logOut=function(){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,1)
    this._ws.send(buf)
}
Connection.prototype.putMessage=function(room,message){
    chat.putMessage(this._ws,room,message)
}
Connection.prototype.putRoom=function(){
    chat.putRoom(this._ws)
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
            rs(a)
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
export default Connection
