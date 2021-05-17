import doe from                 'doe'
import Site from                './main/Site.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
import SitePage from            './main/SitePage.mjs'
let
    credential=new Variable,
    windowSize=new Variable,
    userId=new Variable,
    site=new Site({
        credential(){
            credential.value=site.credential
            userId.value=site.userId
        }
    })
let sitePage=new SitePage
sitePage.credential.bind(credential)
sitePage.userId.bind(userId)
sitePage.out.out(a=>{
    switch(a[0]){
        case'putUser':
            site.putUser(a[1]).then(a[2])
        break
        case'logIn':
            site.logIn(a[1],a[2])
        break
        case'cutCurrentUser':
            site.cutCurrentUser()
        break
        case'logOut':
            site.logOut()
        break
    }
})
doe.head(
    doe.style(style)
)
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
})
navigator.serviceWorker.register('%23sw')
