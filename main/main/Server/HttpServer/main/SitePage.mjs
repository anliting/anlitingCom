import doe from                 'doe'
import HomePage from            './SitePage/HomePage.mjs'
import IdleKingdomPage from     './SitePage/IdleKingdomPage.mjs'
import LoggedInUserPage from    './SitePage/LoggedInUserPage.mjs'
import MazePage from            './SitePage/MazePage.mjs'
import UserPage from            './SitePage/UserPage.mjs'
import Variable from            './Variable.mjs'
import loadIdleKingdomPage from './SitePage/loadIdleKingdomPage.mjs'
import loadMazePage from        './SitePage/loadMazePage.mjs'
function SitePage(out){
    let roomListListener=new Variable
    this._homePage=new HomePage(a=>{
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
                this._mazePage.on()
                this.page.value=this._mazePage
            break
            case'idleKingdom':
                this._offPage()
                loadIdleKingdomPage.call(this)
                this._idleKingdomPage.on()
                this.page.value=this._idleKingdomPage
            break
        }
    })
    this._loggedInUserPage=new LoggedInUserPage(a=>{
        switch(a[0]){
            case'back':
                this._offPage()
                this.page.value=this._homePage
            break
            case'cutCurrentUser':
                ;(async()=>{
                    await new Promise(rs=>
                        this._out(['cutCurrentUser',rs])
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
                this._out(a)
            break
            case'listenRoomList':
                roomListListener.value=a[1]
            break
            case'unlistenMessageList':
            case'unlistenRoomList':
            break
        }
    })
    this._userPage=new UserPage(a=>{
        switch(a[0]){
            case'back':
                this._offPage()
                this.page.value=this._homePage
            break
            case'logIn':
            case'putUser':
                this._out(a)
            break
        }
    })
    this.page=new Variable
    this.credential=new Variable
    this.credential.for((to,from)=>{
        if(from)
            this._out(['unlistenUserProfile',from[0]])
        if(to)
            this._out(['listenUserProfile',to[0],()=>{}])
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
            this._out(['listenRoomList',l])
        })
    })
    this._out=out
    this._homePage.credential.bind(this.credential)
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
