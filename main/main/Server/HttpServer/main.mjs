import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
let
    site=new Site,
    userPage=new UserPage(site),
    loggedInUserPage=new LoggedInUserPage(site),
    currentPage,
    homePage,
    userPanelButton=doe.div({
        className:'button',
        onclick:()=>{
            setPage(userPage.node)
            userPage.focus()
        }
    },'Log In'),
    loggedInUserPageButton=doe.div({
        className:'button',
        onclick:()=>{
            setPage(loggedInUserPage.node)
        }
    }),
    credential=site.credential,
    head
site.out={
    credential(){
        if(!credential&&site.credential)
            doe(head,1,userPanelButton,0,loggedInUserPageButton)
        if(credential&&!site.credential)
            doe(head,1,loggedInUserPageButton,0,userPanelButton)
        if(site.credential)
            loggedInUserPageButton.textContent=site.userId
        else{
            if(currentPage==userPage)
                setPage(homePage)
            if(currentPage==loggedInUserPage)
                setPage(homePage)
        }
        credential=site.credential
    }
}
function setPage(page){
    doe.body(page,1,currentPage)
    currentPage=page
}
userPage.out={
    back(){
        setPage(homePage)
    },
    logOut(){
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
        head=doe.div(
            {className:'a'},
            userPanelButton,
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
