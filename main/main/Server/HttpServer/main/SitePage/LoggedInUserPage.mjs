import doe from             'doe'
import Stream from          '../Stream.mjs'
import Variable from        '../Variable.mjs'
import ChatPage from        './LoggedInUserPage/ChatPage.mjs'
function HomePage(){
    this.out=new Stream
    this.node=doe.div(
        {className:'loggedInUserPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this.out.in(['back'])
                }
            }),
        ),
        doe.div(
            doe.div('Log Out',{
                className:'button',onclick:()=>{
                    this.out.in(['logOut'])
                }
            }),
            ' ',
            doe.div('Delete Current User',{
                className:'button',
                onclick:()=>{
                    this.out.in(['cutCurrentUser'])
                },
            }),
        ),
        doe.div(
            doe.div('Chat',{
                className:'button',
                onclick:()=>{
                    this.out.in(['chat'])
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
function LoggedInUserPage(){
    this.out=new Stream
    let chatPage,homePage
    chatPage=new ChatPage
    chatPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=homePage
            break
            case'createRoom':
            break
        }
    })
    homePage=new HomePage
    homePage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.out.in(a)
            break
            case'chat':
                this.page.bind(chatPage.page)
            break
            case'cutCurrentUser':
                this.out.in(['cutCurrentUser'])
            break
            case'logOut':
                this.out.in(['logOut'])
            break
        }
    })
    this.page=new Variable(homePage)
}
export default LoggedInUserPage
