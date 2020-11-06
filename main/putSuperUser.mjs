import net from'net'
;(async()=>{
    ;(await new Promise(rs=>{
        let c=net.connect('ipc',()=>rs(c))
    })).end(Buffer.from([1]))
})()
