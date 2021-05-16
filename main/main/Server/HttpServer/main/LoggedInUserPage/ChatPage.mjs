import doe from                 'doe'
import Variable from            '../Variable.mjs'
function HomePage(site,out){
    this.node=doe.div(
        {className:'chatPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    out.back()
                }
            }),
        ),
        doe.div(
            doe.div('Create Room',{
                className:'button',
                onclick:()=>{
                    out.createRoom()
                }
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty(
            '--zoom',''+Math.min(a[0],a[1]/(16/22))
        )
    )
}
function ChatPage(site,out){
    this.page=new Variable(new HomePage(site,out))
}
export default ChatPage
