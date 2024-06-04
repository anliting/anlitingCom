import http from            'http'
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
function HttpServer(mainDir,tls,wsEndListen){
    this._mainDir=mainDir
    this._rootContentPromise=calcRootContent(mainDir,wsEndListen)
    this._swPromise=calcSw(mainDir)
    this._server=http.createServer(async(rq,rs)=>{
        let url=new urlModule.URL(rq.url,'http://a')
        if(rq.method=='GET'&&url.pathname=='/'){
            let content=await this._rootContentPromise
            rs.writeHead(200,{
                'content-type':'text/html;charset=utf-8',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            rs.end(content)
            return
        }
        if(rq.method=='GET'&&url.pathname=='/'){
            rs.writeHead(200,{
                'content-type':'text/html;charset=utf-8',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            rs.end(await this._rootContentPromise)
            return
        }
        if(rq.method=='GET'&&url.pathname=='/%23sw'){
            rs.writeHead(200,{
                'content-type':'application/javascript',
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            return rs.end(await this._swPromise)
        }
        if(rq.method=='GET'&&url.pathname in get){
            let a=get[url.pathname]
            rs.writeHead(200,{
                'content-type':a[0],
                'strict-transport-security':
                    'includeSubDomains;max-age=63072000;preload'
            })
            fs.createReadStream(`${mainDir}/main/Server/HttpServer/${a[1]}`).pipe(rs)
            return
        }
        rs.writeHead(400)
        rs.end()
    })
}
HttpServer.prototype.listen=function(a){
    return new Promise(rs=>
        this._server.listen(...a,rs)
    )
}
HttpServer.prototype.end=function(){
    return new Promise(rs=>{
        this._server.close(rs)
    })
}
export default HttpServer
