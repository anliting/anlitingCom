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
            {className:'a'},
            doe.div(
                doe.div('Profile',{
                    className:'button disabled',
                    onclick:()=>{
                    },
                }),
                ' ',
                doe.div('Change Password',{
                    className:'button disabled',
                    onclick:()=>{
                    },
                }),
            ),
            doe.div(
                doe.div('Delete Current User',{
                    className:'button',
                    onclick:()=>{
                        if(
                            confirm('Are you sure to delete this user?')
                        )
                            this.out.in(['cutCurrentUser'])
                    },
                }),
                ' ',
                doe.div('Log Out',{
                    className:'button',
                    onclick:()=>{
                        this.out.in(['logOut'])
                    }
                }),
            ),
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
LoggedInUserPage.style=ChatPage.style+`
    body>.loggedInUserPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
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
