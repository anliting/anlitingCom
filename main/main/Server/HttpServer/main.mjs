import doe from                 'doe'
import Site from                './main/Site.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
import SitePage from            './main/SitePage.mjs'
let
    site=new Site,
    sitePage=new SitePage
site.out={
    credential(){
        sitePage.credential.value=site.credential
        sitePage.userId.value=site.userId
    }
}
sitePage.out.out(a=>{
    switch(a[0]){
        case'putUser':
            site.putUser(a[1]).then(a[2])
        break
        case'logIn':
            site.logIn(a[1],a[2])
        break
        case'cutCurrentUser':
            site.cutCurrentUser().then(a[1])
        break
        case'listenMessageList':
            site.listenMessageList(a[1],a[2])
        break
        case'listenRoomList':
            site.listenRoomList(a[1])
        break
        case'logOut':
            site.logOut()
        break
        case'putMessage':
        case'putRoom':
            site.in.in(a)
        break
    }
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
console.log(navigator.onLine)
navigator.serviceWorker.register('%23sw')
