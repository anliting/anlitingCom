import net from     'net'
import core from    '@anliting/core'
;(async()=>{
    let
        password=Buffer.from(process.argv[2]),
        buffer=Buffer.alloc(1+4+password.length)
    buffer.writeUInt8(1)
    buffer.writeUInt32BE(password.length,1)
    password.copy(buffer,1+4)
    let connection=await new Promise(rs=>{
        let c=net.connect('ipc',()=>rs(c))
    })
    ;(async()=>{
        console.log((await core.content(connection)).readUInt32BE(0))
    })()
    connection.end(buffer)
})()
