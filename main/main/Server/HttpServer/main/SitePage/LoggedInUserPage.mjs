import doe from                 'doe'
import Variable from            '../Variable.mjs'
import ChatPage from            './LoggedInUserPage/ChatPage.mjs'
import ChangePasswordPage from  './LoggedInUserPage/ChangePasswordPage.mjs'
import DeepWorldPage from       './LoggedInUserPage/DeepWorldPage.mjs'
import EditProfilePage from     './LoggedInUserPage/EditProfilePage.mjs'
import HomePage from            './LoggedInUserPage/HomePage.mjs'
function offPage(){
    if(this.page.value==this._deepWorldPage)
        this._deepWorldPage.off()
}
function LoggedInUserPage(out){
    this._out=out
    let chatPage,editProfilePage,changePasswordPage
    this._homePage=new HomePage(a=>{
        switch(a[0]){
            case'back':
                this._out(a)
            break
            case'changePassword':
                offPage.call(this)
                this.page.value=changePasswordPage
            break
            case'chat':
                offPage.call(this)
                this.page.bind(chatPage.page)
            break
            case'cutCurrentUser':
                this._out(['cutCurrentUser'])
            break
            case'deepWorld':
                offPage.call(this)
                this._deepWorldPage.on()
                this.page.value=this._deepWorldPage
            break
            case'editProfile':
                offPage.call(this)
                this.page.value=editProfilePage
            break
            case'logOut':
                this._out(['logOut'])
            break
        }
    })
    editProfilePage=new EditProfilePage(a=>{
        switch(a[0]){
            case'back':
                offPage.call(this)
                this.page.value=this._homePage
            break
        }
    })
    changePasswordPage=new ChangePasswordPage(a=>{
        switch(a[0]){
            case'back':
                offPage.call(this)
                this.page.value=this._homePage
            break
        }
    })
    chatPage=new ChatPage(a=>{
        switch(a[0]){
            case'back':
                offPage.call(this)
                this.page.value=this._homePage
            break
            case'invite':
            case'leave':
            case'listenMessageList':
            case'listenRoomList':
            case'putMessage':
            case'putRoom':
            case'unlistenMessageList':
            case'unlistenRoomList':
                this._out(a)
            break
        }
    })
    this._deepWorldPage=new DeepWorldPage(a=>{
        switch(a[0]){
            case'back':
                offPage.call(this)
                this.page.value=this._homePage
            break
            default:
                this._out(['deepWorld',...a])
            break
        }
    })
    this.page=new Variable(this._homePage)
}
LoggedInUserPage.prototype.off=function(){
    offPage.call(this)
    this.page.value=this._homePage
}
LoggedInUserPage.style=EditProfilePage.style+ChangePasswordPage.style+ChatPage.style+DeepWorldPage.style+`
    body>.loggedInUserPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.loggedInUserPage>*+*{
        margin-top:1em;
    }
    body>.loggedInUserPage>.a>*+*{
        margin-top:.25em;
    }
`
export default LoggedInUserPage
