import doe from                 'doe'
import Site from                './main/Site.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
import SitePage from            './main/SitePage.mjs'
let
    site=new Site,
    sitePage=new SitePage,
    connectionStatus=new Variable(0)
site.onLine=navigator.onLine
ononline=onoffline=()=>site.onLine=navigator.onLine
site.out.out(a=>{
    switch(a[0]){
        case'connectionStatus':
            connectionStatus.value=a[1]
        break
        case'credential':
            sitePage.credential.value=site.credential
        break
    }
})
sitePage.out.to(site.in)
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
let frame=t=>{
    requestAnimationFrame(frame)
    if(sitePage.page.value.animationFrame)
        sitePage.page.value.animationFrame(t)
}
requestAnimationFrame(frame)
navigator.serviceWorker.register('%23sw')
