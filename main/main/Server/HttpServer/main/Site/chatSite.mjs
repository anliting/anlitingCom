let textEncoder=new TextEncoder,textDecoder=new TextDecoder
let chat={}
chat.invite=function(con,room,user,cb){
    let
        buf=new ArrayBuffer(9),
        dataView=new DataView(buf)
    dataView.setUint8(0,10)
    dataView.setUint32(1,room)
    dataView.setUint32(5,user)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        con.offPort(port)
        cb()
    })
}
chat.leave=function(con,room,cb){
    let
        buf=new ArrayBuffer(9),
        dataView=new DataView(buf)
    dataView.setUint8(0,11)
    dataView.setUint32(1,room)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        con.offPort(port)
        cb()
    })
}
chat.listenMessageList=function(con,room,cb){
    let
        buf=new ArrayBuffer(5),
        dataView=new DataView(buf)
    dataView.setUint8(0,9)
    dataView.setUint32(1,room)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        cb(JSON.parse(textDecoder.decode(a)))
    })
    con.onceLogOut(()=>{
        con.offPort(port)
    })
}
chat.listenRoomList=function(con,cb){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,7)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        cb(JSON.parse(textDecoder.decode(a)))
    })
    con.onceLogOut(()=>{
        con.offPort(port)
    })
}
chat.putRoom=function(con,cb){
    let buf=new ArrayBuffer(1),dataView=new DataView(buf)
    dataView.setUint8(0,4)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        con.offPort(port)
        cb()
    })
}
chat.putMessage=function(con,room,message,cb){
    message=textEncoder.encode(message)
    let
        buf=new ArrayBuffer(5+message.length),
        dataView=new DataView(buf),
        array=new Uint8Array(buf)
    dataView.setUint8(0,8)
    dataView.setUint32(1,room)
    array.set(message,5)
    let port=con.send(buf,1)
    con.onPort(port,a=>{
        con.offPort(port)
        cb()
    })
}
export default chat
