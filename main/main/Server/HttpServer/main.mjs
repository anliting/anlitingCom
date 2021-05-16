import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
function HomePage(site,out){
    this._out=out
    this.node=doe.div(
        {className:'homePage'},
        doe.div(
            {className:'a'},
            n=>{
                credential.iff(
                    n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            this._out.logIn()
                        }
                    },'Log In'),
                    a=>!a
                )
                credential.iff(
                    n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            this._out.loggedInUserPage()
                        },
                    },n=>{
                        credential.for(to=>{
                            if(to)
                                n.textContent=site.userId
                        })
                    })
                )
            },
        ),
        doe.div(
            {className:'b'},
            'This is An-Li Ting\'s personal website.'
        ),
        doe.div(
            {className:'b'},
            'You might also want to visit ',
            doe.a({href:'https://althea.anliting.com/'},'my blog'),
            '.'
        ),
        doe.div(
            {className:'b'},
            'Here are some services this website provides:',
            doe.ul(
                doe.li(doe.a({
                    href:'https://stopwatch.anliting.com/'
                },'Stopwatch'))
            )
        ),
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
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
homePage=new HomePage(site,{
    logIn(){
        currentPage.bind(userPage.page)
        userPage.focus()
    },
    loggedInUserPage(){
        currentPage.bind(loggedInUserPage.page)
    },
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
