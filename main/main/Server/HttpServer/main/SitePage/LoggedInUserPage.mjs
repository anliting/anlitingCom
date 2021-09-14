import doe from                 'doe'
import{Stream}from              'dt'
import Variable from            '../Variable.mjs'
import ChatPage from            './LoggedInUserPage/ChatPage.mjs'
import ChangePasswordPage from  './LoggedInUserPage/ChangePasswordPage.mjs'
import DeepWorldPage from       './LoggedInUserPage/DeepWorldPage.mjs'
import EditProfilePage from     './LoggedInUserPage/EditProfilePage.mjs'
import HomePage from            './LoggedInUserPage/HomePage.mjs'
function LoggedInUserPage(){
    this.out=new Stream
    let chatPage,homePage,editProfilePage,changePasswordPage,deepWorldPage
    homePage=new HomePage
    homePage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.out.in(a)
            break
            case'changePassword':
                this.page.value=changePasswordPage
            break
            case'chat':
                this.page.bind(chatPage.page)
            break
            case'cutCurrentUser':
                this.out.in(['cutCurrentUser'])
            break
            case'deepWorld':
                this.page.value=deepWorldPage
            break
            case'editProfile':
                this.page.value=editProfilePage
            break
            case'logOut':
                this.out.in(['logOut'])
            break
        }
    })
    editProfilePage=new EditProfilePage
    editProfilePage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
        }
    })
    changePasswordPage=new ChangePasswordPage
    changePasswordPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
        }
    })
    chatPage=new ChatPage
    chatPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
            case'invite':
            case'leave':
            case'listenMessageList':
            case'listenRoomList':
            case'putMessage':
            case'putRoom':
            case'unlistenMessageList':
            case'unlistenRoomList':
                this.out.in(a)
            break
        }
    })
    deepWorldPage=new DeepWorldPage
    deepWorldPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
        }
    })
    this.page=new Variable(homePage)
}
LoggedInUserPage.style=ChatPage.style+`
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
    body>.deepWorldPage{
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
    body>.editProfilePage{
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
    body>.changePasswordPage{
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
`
export default LoggedInUserPage
