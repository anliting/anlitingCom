import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import minify from          './HttpServer/minify.mjs'
import calcRootContent from './HttpServer/calcRootContent.mjs'
let get={
    '/diamond-red.png':['image/png','diamond-red.png'],
    '/farmer.png':['image/png','idleKingdom/farmer.png'],
    '/gold.png':['image/png','idleKingdom/gold.png'],
    '/hunter.png':['image/png','idleKingdom/hunter.png'],
}
async function calcSw(mainDir){
    return minify(
        ''+await fs.promises.readFile(
            `${mainDir}/main/Server/HttpServer/sw`
        )
    )
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
        if(header[':method']=='GET'&&url.pathname in get){
            let a=get[url.pathname]
            stream.respond({
                ':status':200,
                'content-type':a[0],
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            fs.createReadStream(`${mainDir}/main/Server/HttpServer/${a[1]}`).pipe(stream)
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
