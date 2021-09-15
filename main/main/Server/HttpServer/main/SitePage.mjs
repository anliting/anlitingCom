import doe from                 'doe'
import HomePage from            './SitePage/HomePage.mjs'
import UserPage from            './SitePage/UserPage.mjs'
import MazePage from            './SitePage/MazePage.mjs'
import IdleKingdomPage from     './SitePage/IdleKingdomPage.mjs'
import LoggedInUserPage from    './SitePage/LoggedInUserPage.mjs'
import{Stream}from              'dt'
import Variable from            './Variable.mjs'
function popPage(){
    if(this.page.value==this._idleKingdomPage)
        this._idleKingdomPage.clear()
    if(this.page.value==this._loggedInUserPage.page.value)
        this._loggedInUserPage.clear()
    if(this.page.value==this._mazePage)
        this._mazePage.clear()
    if(this.page.value==this._userPage.page.value)
        this._userPage.clear()
}
function SitePage(){
    let roomListListener=new Variable
    this._homePage=new HomePage
    this._idleKingdomPage=new IdleKingdomPage
    this._loggedInUserPage=new LoggedInUserPage
    this._mazePage=new MazePage
    this._userPage=new UserPage
    this.page=new Variable
    this.credential=new Variable
    this.credential.for((to,from)=>{
        if(from)
            this.out.in(['unlistenUserProfile',from[0]])
        if(to)
            this.out.in(['listenUserProfile',to[0],console.log])
        if([
            this._userPage.page.value,
            this._loggedInUserPage.page.value,
        ].includes(
            this.page.value
        )){
            popPage.call(this)
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
                popPage.call(this)
                this.page.bind(this._userPage.page)
            break
            case'loggedInUserPage':
                popPage.call(this)
                this.page.bind(this._loggedInUserPage.page)
            break
            case'maze':
                popPage.call(this)
                this.page.value=this._mazePage
            break
            case'idleKingdom':
                popPage.call(this)
                this.page.value=this._idleKingdomPage
            break
        }
    })
    this._userPage.out.out(a=>{
        switch(a[0]){
            case'back':
                popPage.call(this)
                this.page.value=this._homePage
            break
            case'logIn':
            case'putUser':
                this.out.in(a)
            break
        }
    })
    this._loggedInUserPage.out.out(a=>{
        switch(a[0]){
            case'back':
                popPage.call(this)
                this.page.value=this._homePage
            break
            case'cutCurrentUser':
                ;(async()=>{
                    await new Promise(rs=>
                        this.out.in(['cutCurrentUser',rs])
                    )
                    popPage.call(this)
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
    this._mazePage.out.out(a=>{
        switch(a[0]){
            case'back':
                popPage.call(this)
                this.page.value=this._homePage
            break
        }
    })
    this._idleKingdomPage.out.out(a=>{
        switch(a[0]){
            case'back':
                popPage.call(this)
                this.page.value=this._homePage
            break
        }
    })
    this.page.value=this._homePage
}
SitePage.style=UserPage.style+LoggedInUserPage.style+MazePage.style+IdleKingdomPage.style+HomePage.style
export default SitePage
