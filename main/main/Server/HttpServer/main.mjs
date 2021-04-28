import doe from             'doe'
import Site from            './main/Site.mjs'
import UserPage from       './main/UserPage.mjs'
import style from           './main/style.mjs'
let
    site=new Site,
    userPanel=new UserPage(site),
    currentPage,
    homePage,
    userPanelButton
site.out={
    credential(){
        userPanel.credential(site.credential)
        userPanelButton.textContent=site.credential?site.userId:'Log In'
    }
}
function setPage(page){
    doe.body(page,1,currentPage)
    currentPage=page
}
userPanel.out={
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
            userPanelButton=doe.div({className:'button',onclick:()=>{
                setPage(userPanel.node)
                userPanel.focus()
            }},'Log In'),
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
