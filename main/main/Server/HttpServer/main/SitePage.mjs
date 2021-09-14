import doe from                 'doe'
import HomePage from            './SitePage/HomePage.mjs'
import UserPage from            './SitePage/UserPage.mjs'
import MazePage from            './SitePage/MazePage.mjs'
import IdleKingdomPage from     './SitePage/IdleKingdomPage.mjs'
import LoggedInUserPage from    './SitePage/LoggedInUserPage.mjs'
import{Stream}from              'dt'
import Variable from            './Variable.mjs'
function SitePage(){
    let
        userPage=new UserPage,
        loggedInUserPage=new LoggedInUserPage,
        homePage=new HomePage,
        mazePage=new MazePage,
        idleKingdomPage=new IdleKingdomPage,
        roomListListener=new Variable
    this.page=new Variable
    this.credential=new Variable
    this.credential.for((to,from)=>{
        if(from)
            this.out.in(['unlistenUserProfile',from[0]])
        if(to)
            this.out.in(['listenUserProfile',to[0],console.log])
        if([userPage.page.value,loggedInUserPage.page.value].includes(
            this.page.value
        ))
            this.page.value=homePage
        roomListListener[to?'for':'unfor'](l=>{
            if(!l)
                return
            this.out.in(['listenRoomList',l])
        })
    })
    this.out=new Stream
    homePage.credential.bind(this.credential)
    homePage.out.out(a=>{
        switch(a){
            case'logIn':
                userPage.clear()
                this.page.bind(userPage.page)
            break
            case'loggedInUserPage':
                loggedInUserPage.clear()
                this.page.bind(loggedInUserPage.page)
            break
            case'maze':
                mazePage.clear()
                this.page.value=mazePage
            break
            case'idleKingdom':
                idleKingdomPage.clear()
                this.page.value=idleKingdomPage
            break
        }
    })
    userPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
            case'logIn':
            case'putUser':
                this.out.in(a)
            break
        }
    })
    loggedInUserPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
            case'cutCurrentUser':
                ;(async()=>{
                    await new Promise(rs=>
                        this.out.in(['cutCurrentUser',rs])
                    )
                    this.page.value=homePage
                })()
            break
            case'invite':
            case'leave':
            case'listenMessageList':
            case'logOut':
            case'putMessage':
            case'putRoom':
                this.out.in(a)
            break
            case'listenRoomList':
                roomListListener.value=a[1]
            break
            case'unlistenMessageList':
            case'unlistenRoomList':
            break
        }
    })
    mazePage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
        }
    })
    idleKingdomPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
        }
    })
    this.page.value=homePage
}
SitePage.style=UserPage.style+LoggedInUserPage.style+MazePage.style+IdleKingdomPage.style+HomePage.style
export default SitePage
