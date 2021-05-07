import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
function HomePage(site,out){
    this._out=out
    this.size=new Variable([1,1])
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
    this.size.for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
let
    currentPage=new Variable,
    credential=new Variable(0),
    windowSize=new Variable,
    site=new Site({
        credential(){
            credential.value=site.credential
        }
    }),
    userPage=new UserPage(site,{
        back(){
            currentPage.value=homePage
        },
    }),
    loggedInUserPage=new LoggedInUserPage(site,{
        back(){
            currentPage.value=homePage
        },
        logOut(){
            currentPage.value=homePage
        },
    }),
    homePage=new HomePage(site,{
        logIn(){
            currentPage.bind(userPage.page)
            userPage.focus()
        },
        loggedInUserPage(){
            currentPage.value=loggedInUserPage
        },
    })
currentPage.value=homePage
credential.for(to=>{
    if(!to&&[userPage,loggedInUserPage].includes(
        currentPage.value
    ))
        currentPage.value=homePage
})
doe.head(
    doe.style(style)
)
currentPage.for((to,from)=>doe.body(from&&[1,from.node,0],to.node))
function outSize(){
    let bcr=document.body.getBoundingClientRect()
    windowSize.value=[bcr.width,bcr.height]
}
outSize()
onresize=outSize
currentPage.for((to,from)=>{
    if(from)
        from.size.value=[1,1]
    to.size.bind(windowSize)
})
navigator.serviceWorker.register('%23sw')
