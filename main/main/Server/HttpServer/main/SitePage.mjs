import doe from                 'doe'
import HomePage from            './SitePage/HomePage.mjs'
import UserPage from            './SitePage/UserPage.mjs'
import LoggedInUserPage from    './SitePage/LoggedInUserPage.mjs'
import Stream from              './Stream.mjs'
import Variable from            './Variable.mjs'
function SitePage(){
    let
        userPage=new UserPage,
        loggedInUserPage=new LoggedInUserPage,
        homePage=new HomePage,
        roomListListener=new Variable,
        messageListListener=new Variable
    this.page=new Variable
    this.credential=new Variable
    this.credential.for(to=>{
        if(!to&&[userPage.page.value,loggedInUserPage.page.value].includes(
            this.page.value
        ))
            this.page.value=homePage
        roomListListener[to?'for':'unfor'](l=>{
            if(!l)
                return
            this.out.in(['listenRoomList',l])
        })
    })
    this.userId=new Variable
    this.out=new Stream
    homePage.credential.bind(this.credential)
    homePage.userId.bind(this.userId)
    homePage.out.out(a=>{
        switch(a){
            case'logIn':
                this.page.bind(userPage.page)
                userPage.focus()
            break
            case'loggedInUserPage':
                this.page.bind(loggedInUserPage.page)
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
            case'putMessage':
            case'putRoom':
            case'logOut':
                this.out.in(a)
            break
            case'listenRoomList':
                roomListListener.value=a[1]
            break
            case'listenMessageList':
                messageListListener.value=[a[1],a[2]]
            break
            case'unlistenMessageList':
            case'unlistenRoomList':
            break
        }
    })
    this.page.value=homePage
}
SitePage.style=UserPage.style+LoggedInUserPage.style
export default SitePage
