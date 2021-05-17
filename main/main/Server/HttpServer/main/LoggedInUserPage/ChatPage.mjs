import doe from                 'doe'
import Stream from              '../Stream.mjs'
import Variable from            '../Variable.mjs'
function HomePage(){
    this.out=new Stream
    this.node=doe.div(
        {className:'chatPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this.out.in(['back'])
                }
            }),
        ),
        doe.div(
            doe.div('Create Room',{
                className:'button',
                onclick:()=>{
                    this.out.in(['createRoom'])
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
function ChatPage(){
    let homepage=new HomePage()
    this.page=new Variable(homepage)
    this.out=homepage.out
}
export default ChatPage
