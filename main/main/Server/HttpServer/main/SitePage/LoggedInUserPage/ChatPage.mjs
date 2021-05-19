import doe from                 'doe'
import Stream from              '../../Stream.mjs'
import Variable from            '../../Variable.mjs'
function HomePage(){
    this.roomList=new Variable
    this.out=new Stream
    this.node=doe.div(
        {className:'chatPage'},
        doe.div(
            {className:'controlPanel'},
            doe.div(
                doe.div(
                    {className:'a'},
                    doe.div('Back',{
                        className:'button',
                        onclick:()=>{
                            this.out.in(['back'])
                        },
                    }),
                ),
                doe.div(
                    {className:'b'},
                    doe.div('Create Room',{
                        className:'button',
                        onclick:()=>{
                            this.out.in(['putRoom'])
                        },
                    }),
                ),
            ),
        ),
        doe.div({className:'roomList'},
            doe.div(n=>{
                this.roomList.for(a=>{
                    if(!a)
                        return
                    n.textContent=''
                    a.map(a=>
                        doe(n,
                            doe.div(
                                doe.div({
                                    className:'button item'
                                },''+a.id)
                            )
                        )
                    )
                })
            })
        )
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty(
            '--zoom',''+Math.min(a[0],a[1]/(16/22))
        )
    )
}
function ChatPage(){
    let homepage=new HomePage
    homepage.roomList.value=[
        {id:0,user:[0]},
        {id:1,user:[0]},
        {id:2,user:[0]},
        {id:3,user:[0]},
        {id:4,user:[0]},
        {id:5,user:[0]},
        {id:6,user:[0]},
        {id:7,user:[0]},
        {id:8,user:[0]},
        {id:9,user:[0]},
        {id:10,user:[0]},
        {id:11,user:[0]},
    ]
    this.page=new Variable(homepage)
    this.out=new Stream
    homepage.out.out(a=>
        this.out.in(a)
    )
    this.out.in(['listenRoomList',roomList=>{
        homepage.roomList.value=roomList
    }])
}
export default ChatPage
