import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import Variable from            './main/Variable.mjs'
let
    currentPage=new Variable,
    credential=new Variable(0),
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
    homePage=doe.div(
        {className:'homePage'},
        doe.div(
            {className:'a'},
            n=>{
                credential.iff(
                    n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            currentPage.value=userPage.node
                            userPage.focus()
                        }
                    },'Log In'),
                    a=>!a
                )
                credential.iff(
                    n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            currentPage.value=loggedInUserPage.node
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
currentPage.for((to,from)=>
    doe.body(from&&[1,from,0],to)
)
navigator.serviceWorker.register('%23sw')
