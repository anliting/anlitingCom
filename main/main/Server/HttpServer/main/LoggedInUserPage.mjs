import doe from             'doe'
import Variable from        './Variable.mjs'
import ChatPage from        './LoggedInUserPage/ChatPage.mjs'
function HomePage(site,out){
    this.out=out
    this.node=doe.div(
        {className:'loggedInUserPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this.out.back()
                }
            }),
        ),
        doe.div(
            doe.div('Log Out',{
                className:'button',onclick:()=>{
                    site.logOut()
                    this.out.logOut()
                }
            }),
            ' ',
            doe.div('Delete Current User',{
                className:'button',
                onclick:()=>{
                    site.cutCurrentUser()
                    this.out.back()
                },
            }),
        ),
        doe.div(
            doe.div('Chat',{
                className:'button',
                onclick:()=>{
                    this.out.chat()
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
function LoggedInUserPage(site,out){
    let chatPage,homePage
    chatPage=new ChatPage(site,{
        back:_=>{
            this.page.value=homePage
        },
        createRoom:_=>{
        },
    })
    homePage=new HomePage(site,{
        back(){
            out.back()
        },
        chat:_=>{
            this.page.bind(chatPage.page)
        },
        logOut(){
            out.logOut()
        },
    })
    this.page=new Variable(homePage)
}
export default LoggedInUserPage
