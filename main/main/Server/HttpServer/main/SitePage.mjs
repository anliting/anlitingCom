import doe from                 'doe'
import HomePage from            './SitePage/HomePage.mjs'
import IdleKingdomPage from     './SitePage/IdleKingdomPage.mjs'
import LoggedInUserPage from    './SitePage/LoggedInUserPage.mjs'
import MazePage from            './SitePage/MazePage.mjs'
import UserPage from            './SitePage/UserPage.mjs'
import{Stream}from              'dt'
import Variable from            './Variable.mjs'
import loadIdleKingdomPage from './SitePage/loadIdleKingdomPage.mjs'
import loadMazePage from        './SitePage/loadMazePage.mjs'
function SitePage(){
    let roomListListener=new Variable
    this._homePage=new HomePage
    this._loggedInUserPage=new LoggedInUserPage
    this._userPage=new UserPage
    this.page=new Variable
    this.credential=new Variable
    this.credential.for((to,from)=>{
        if(from)
            this.out.in(['unlistenUserProfile',from[0]])
        if(to)
            this.out.in(['listenUserProfile',to[0],()=>{}])
        if([
            this._userPage.page.value,
            this._loggedInUserPage.page.value,
        ].includes(
            this.page.value
        )){
            this._offPage()
            this.page.value=this._homePage
        }
        roomListListener[to?'for':'unfor'](l=>{
            if(!l)
                return
            this.out.in(['listenRoomList',l])
        })
    })
    this.out=new Stream
    this._homePage.credential.bind(this.credential)
    this._homePage.out.out(a=>{
        switch(a){
            case'logIn':
                this._offPage()
                this.page.bind(this._userPage.page)
            break
            case'loggedInUserPage':
                this._offPage()
                this.page.bind(this._loggedInUserPage.page)
            break
            case'maze':
                this._offPage()
                loadMazePage.call(this)
                this._mazePage.start()
                this.page.value=this._mazePage
            break
            case'idleKingdom':
                this._offPage()
                loadIdleKingdomPage.call(this)
                this._idleKingdomPage.start()
                this.page.value=this._idleKingdomPage
            break
        }
    })
    this._loggedInUserPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this._offPage()
                this.page.value=this._homePage
            break
            case'cutCurrentUser':
                ;(async()=>{
                    await new Promise(rs=>
                        this.out.in(['cutCurrentUser',rs])
                    )
                    this._offPage()
                    this.page.value=this._homePage
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
    this._userPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this._offPage()
                this.page.value=this._homePage
            break
            case'logIn':
            case'putUser':
                this.out.in(a)
            break
        }
    })
    this.page.value=this._homePage
}
SitePage.prototype._offPage=function(){
    if(this.page.value==this._loggedInUserPage.page.value)
        this._loggedInUserPage.off()
    if(this.page.value==this._userPage.page.value)
        this._userPage.off()
}
SitePage.style=UserPage.style+LoggedInUserPage.style+MazePage.style+IdleKingdomPage.style+HomePage.style
export default SitePage
