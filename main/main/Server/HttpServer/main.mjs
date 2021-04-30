import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import StatusHolder from        './main/StatusHolder.mjs'
let
    site=new Site,
    userPage=new UserPage(site),
    loggedInUserPage=new LoggedInUserPage(site),
    currentPage,
    homePage,
    credentialHolder=new StatusHolder
site.out={
    credential(){
        credentialHolder.map.credential=site.credential
    }
}
function setPage(page){
    doe.body(page,1,currentPage)
    currentPage=page
}
credentialHolder.for(a=>{
    if(!a.credential&&[userPage,loggedInUserPage].includes(currentPage))
        setPage(homePage)
})
userPage.out={
    back(){
        setPage(homePage)
    },
}
loggedInUserPage.out={
    back(){
        setPage(homePage)
    },
    logOut(){
        setPage(homePage)
    },
}
doe.head(
    doe.style(style)
)
doe.body(
    currentPage=homePage=doe.div(
        {className:'homePage'},
        doe.div(
            {className:'a'},
            n=>{
                credentialHolder.iff(
                    a=>!a.credential,n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            setPage(userPage.node)
                            userPage.focus()
                        }
                    },'Log In')
                )
                credentialHolder.iff(
                    a=>a.credential,n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            setPage(loggedInUserPage.node)
                        },
                    },n=>{
                        credentialHolder.for(a=>{
                            if(a.credential)
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
    ),
)
navigator.serviceWorker.register('%23sw')
