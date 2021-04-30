import doe from                 'doe'
import Site from                './main/Site.mjs'
import UserPage from            './main/UserPage.mjs'
import LoggedInUserPage from    './main/LoggedInUserPage.mjs'
import style from               './main/style.mjs'
import StatusHolder from        './main/StatusHolder.mjs'
function ValueStatusHolder(){
    this._transform=[]
}
Object.defineProperty(ValueStatusHolder.prototype,'value',{get(){
    return this._value
},set(value){
    for(let t of this._transform)
        t(this._value,value)
    this._value=value
}})
ValueStatusHolder.prototype.transform=function(transform){
    this._transform.push(transform)
}
let
    site=new Site,
    userPage=new UserPage(site),
    loggedInUserPage=new LoggedInUserPage(site),
    homePage,
    credentialHolder=new StatusHolder,
    currentPage=new ValueStatusHolder
currentPage.transform((from,to)=>{
    doe.body(to,from&&[1,from])
})
site.out={
    credential(){
        credentialHolder.map.credential=site.credential
    }
}
function setPage(page){
    currentPage.value=page
}
credentialHolder.for(a=>{
    if(!a.credential&&[userPage,loggedInUserPage].includes(
        currentPage.value
    ))
        currentPage.value=homePage
})
userPage.out={
    back(){
        currentPage.value=homePage
    },
}
loggedInUserPage.out={
    back(){
        currentPage.value=homePage
    },
    logOut(){
        currentPage.value=homePage
    },
}
homePage=doe.div(
    {className:'homePage'},
    doe.div(
        {className:'a'},
        n=>{
            credentialHolder.iff(
                a=>!a.credential,n,
                doe.div({
                    className:'button',
                    onclick:()=>{
                        currentPage.value=userPage.node
                        userPage.focus()
                    }
                },'Log In')
            )
            credentialHolder.iff(
                a=>a.credential,n,
                doe.div({
                    className:'button',
                    onclick:()=>{
                        currentPage.value=loggedInUserPage.node
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
)
doe.head(
    doe.style(style)
)
currentPage.value=homePage
navigator.serviceWorker.register('%23sw')
