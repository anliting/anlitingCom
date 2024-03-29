import doe from                 'doe'
import Site from                './main/Site.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
import SitePage from            './main/SitePage.mjs'
let
    site,
    sitePage,
    connectionStatus=new Variable(0),
    sw=(async()=>{
        let reg=await navigator.serviceWorker.register('%23sw')
        await new Promise(rs=>{
            if(reg.active)
                return rs()
            reg.onupdatefound=e=>
                reg.installing.onstatechange=e=>{
                    if(reg.active)
                        rs()
                }
        })
        return reg.active
    })()
;(async()=>{
    sw=await sw
    sw.postMessage(['getLogIn'])
})()
site=new Site(a=>{
    switch(a[0]){
        case'connectionStatus':
            connectionStatus.value=a[1]
        break
        case'credential':
            sitePage.credential.value=site.credential
        break
    }
})
site.onLine=navigator.onLine
ononline=onoffline=()=>site.onLine=navigator.onLine
sitePage=new SitePage(a=>{
    if(['logIn','logOut'].includes(a[0]))
        (async()=>{
            sw=await sw
            sw.postMessage(a)
        })()
    else
        site.in(a)
})
doe.head(
    doe.style(
        style+
        SitePage.style
    )
)
let windowSize=new Variable
function outSize(){
    let bcr=document.body.getBoundingClientRect()
    windowSize.value=[bcr.width,bcr.height]
}
outSize()
onresize=outSize
let connectionStatusPanel=doe.div({className:'connectionStatusPanel'})
connectionStatus.putTransform((to,from)=>{
    connectionStatusPanel.classList.add('changed')
    if(from)
        connectionStatusPanel.classList.remove('connected')
    if(to)
        connectionStatusPanel.classList.add('connected')
})
doe.body(connectionStatusPanel)
windowSize.for(a=>
    connectionStatusPanel.style.setProperty(
        '--zoom',''+Math.min(a[0],a[1]/(3/4))
    )
)
sitePage.page.for((to,from)=>{
    if(from){
        from.size.value=[1,1]
        doe.body(1,from.node)
    }
    doe.body(to.node)
    to.size.bind(windowSize)
    if(to.focus)
        to.focus()
})
onkeydown=e=>{
    if(sitePage.page.value.keyDown)
        sitePage.page.value.keyDown(e)
}
onkeyup=e=>{
    if(sitePage.page.value.keyUp)
        sitePage.page.value.keyUp(e)
}
let frame=t=>{
    requestAnimationFrame(frame)
    if(sitePage.page.value.animationFrame)
        sitePage.page.value.animationFrame(t)
}
requestAnimationFrame(frame)
navigator.serviceWorker.onmessage=e=>{
    if(['logIn','logOut'].includes(e.data[0]))
        site.in(e.data)
}
