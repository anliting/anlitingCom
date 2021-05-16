import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
let
    currentPage,
    credential,
    windowSize,
    site,
    userPage,
    loggedInUserPage,
    homePage
currentPage=new Variable
windowSize=new Variable
credential=new Variable().for(to=>{
    if(!to&&[userPage,loggedInUserPage].includes(
        currentPage.value
    ))
        currentPage.value=homePage
})
site=new Site({
    credential(){
        credential.value=site.credential
    }
})
homePage=new HomePage
homePage.out.out(a=>{
    switch(a){
        case'logIn':
            currentPage.bind(userPage.page)
            userPage.focus()
            break
        case'loggedInUserPage':
            currentPage.bind(loggedInUserPage.page)
            break
    }
})
homePage.credential.bind(credential)
credential.for(()=>{
    homePage.userId.value=site.userID
})
userPage=new UserPage(site,{
    back(){
        currentPage.value=homePage
    },
})
loggedInUserPage=new LoggedInUserPage(site,{
    back(){
        currentPage.value=homePage
    },
    logOut(){
        currentPage.value=homePage
    },
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
currentPage.setValue(homePage).for((to,from)=>{
    if(from){
        from.size.value=[1,1]
        doe.body(1,from.node)
    }
    to.size.bind(windowSize)
    doe.body(to.node)
})
navigator.serviceWorker.register('%23sw')
