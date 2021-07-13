import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import link from            './HttpServer/link.mjs'
import minify from          './HttpServer/minify.mjs'
import htmlMinifier from    'html-minifier'
function calcSw(mainDir){
    return fs.promises.readFile(`${mainDir}/main/Server/HttpServer/sw`)
}
async function calcRootContent(mainDir,wsEndListen){
    let main=(async()=>minify(`globalThis.anlitingCom=${
        JSON.stringify(wsEndListen)
    };${
        await link(`${mainDir}/main/Server/HttpServer/main.mjs`,{
            doe:`${mainDir}/../lib/doe/export/main.mjs`,
            dt:`${mainDir}/../lib/dt/export/main.mjs`,
            uri:`${mainDir}/../lib/uri/main/uri.mjs`,
        })
    }`))()
    return htmlMinifier.minify(`
        <!doctype html>
        <meta name=viewport content='initial-scale=1,width=device-width'>
        <link rel=icon href=data:,>
        <title>anliting.com</title>
        <body>
        <script type=module>${await main}</script>
    `,{
        collapseWhitespace:true,
        removeAttributeQuotes:true,
        removeOptionalTags:true,
    })
}
function createTypeAHttp2Server(tls){
    return tls?
        http2.createSecureServer().on('secureConnection',socket=>{
            socket.on('error',()=>{})
        }).on('tlsClientError',()=>{})
    :
        http2.createServer()
}
function HttpServer(mainDir,tls,wsEndListen){
    this._mainDir=mainDir
    this._session=new Set
    this._rootContentPromise=calcRootContent(mainDir,wsEndListen)
    this._swPromise=calcSw(mainDir)
    this._server=createTypeAHttp2Server(tls).on('session',session=>{
        this._session.add(session)
        session.on('close',()=>
            this._session.delete(session)
        )
    }).on('stream',async(stream,header)=>{
        stream.on('error',()=>{stream.close()})
        let url=new urlModule.URL(header[':path'],'http://a')
        if(header[':method']=='GET'&&url.pathname=='/'){
            let content=await this._rootContentPromise
            if(stream.closed)
                return
            stream.respond({
                ':status':200,
                'content-type':'text/html;charset=utf-8',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            stream.end(content)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/%23sw'){
            stream.respond({
                ':status':200,
                'content-type':'application/javascript',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            return stream.end(await this._swPromise)
        }
        if(header[':method']=='GET'&&url.pathname=='/diamond-red.png'){
            if(stream.closed)
                return
            stream.respond({
                ':status':200,
                'content-type':'image/png',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            fs.createReadStream(`${mainDir}/main/Server/HttpServer/diamond-red.png`).pipe(stream)
            return
        }
        stream.respond({
            ':status':400,
            'strict-transport-security':
                'includeSubDomains;max-age=63072000;preload'
        })
        stream.end()
    })
}
HttpServer.prototype.setSecureContext=function(secureContext){
    this._server.setSecureContext(secureContext)
}
HttpServer.prototype.listen=function(a){
    return new Promise(rs=>
        this._server.listen(...a,rs)
    )
}
HttpServer.prototype.end=function(){
    return new Promise(rs=>{
        this._server.close(rs)
        this._session.forEach(a=>
            a.destroy()
        )
    })
}
export default HttpServer
