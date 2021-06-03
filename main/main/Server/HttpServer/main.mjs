//有網路且沒連線時，定期重試
import doe from                 'doe'
import Site from                './main/Site.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
import SitePage from            './main/SitePage.mjs'
let
    site=new Site,
    sitePage=new SitePage,
    connectionStatus=new Variable(0)
site.onLine.value=navigator.onLine
ononline=onoffline=()=>
    site.onLine.value=navigator.onLine
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
sitePage.page.for((to,from)=>{
    if(from){
        from.size.value=[1,1]
        doe.body(1,from.node)
    }
    to.size.bind(windowSize)
    doe.body(to.node)
    if(to.focus)
        to.focus()
})
let connectionStatusPanel=doe.div(
    {className:'connectionStatusPanel'},
)
connectionStatus.for((to,from)=>{
    if(from)
        connectionStatusPanel.classList.remove('connected')
    if(to)
        connectionStatusPanel.classList.add('connected')
})
doe.body(connectionStatusPanel)
windowSize.for(a=>
    connectionStatusPanel.style.setProperty(
        '--zoom',''+Math.min(a[0],a[1]/(16/22))
    )
)
navigator.serviceWorker.register('%23sw')
