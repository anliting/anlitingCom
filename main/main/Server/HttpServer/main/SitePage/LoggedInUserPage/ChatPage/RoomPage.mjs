import doe from                 'doe'
import Stream from              '../../../Stream.mjs'
import Variable from            '../../../Variable.mjs'
function RoomPage(){
    this._node={}
    this._scrollRatio=1
    this._skipOnScroll=0
    this.messageList=new Variable([])
    this.out=new Stream
    this.node=doe.div(
        {className:'chatRoomPage'},
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
                    doe.div('Invite',{
                        className:'button disabled',
                        onclick:()=>{
                        },
                    }),
                    ' ',
                    doe.div('Leave',{
                        className:'button disabled',
                        onclick:()=>{
                            this.out.in(['leave'])
                        },
                    },n=>{doe(n.style,{
                        color:'#ff7f7f',
                    })}),
                ),
            ),
        ),
        doe.div({className:'messageList'},
            this._node.messageList=doe.div({onscroll:()=>{
                if(this._skipOnScroll)
                    return this._skipOnScroll=0
                this._scrollRatio=
                    this._node.messageList.scrollTop/
                    this._node.messageList.scrollHeight
            }},n=>{
                this.messageList.for(a=>{
                    let bottom=
                        n.scrollHeight<
                        n.scrollTop+n.getBoundingClientRect().height+1
                    n.textContent=''
                    a.map(a=>
                        doe(n,
                            doe.div(
                                `${a.user}: ${a.content}`,
                            )
                        )
                    )
                    if(bottom)
                        n.scrollTop=n.scrollHeight
                })
            })
        ),
        doe.div(
            {className:'sendPanel'},
            doe.input({onkeydown:e=>{
                if(e.key=='Enter'){
                    this.out.in(['putMessage',e.target.value])
                    e.target.value=''
                }
            }}),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this._skipOnScroll=1
        this.node.style.setProperty(
            '--zoom',''+Math.min(a[0],a[1]/(16/22))
        )
        this._node.messageList.scrollTop=
            this._scrollRatio*
            this._node.messageList.scrollHeight
    })
}
RoomPage.style=`
    body>.chatRoomPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.chatRoomPage>.controlPanel>*{
        display:table;
        width:100%;
    }
    body>.chatRoomPage>.controlPanel>*>.a{
        display:table-cell;
        text-align:left;
    }
    body>.chatRoomPage>.controlPanel>*>.b{
        display:table-cell;
        text-align:right;
    }
    body>.chatRoomPage>.messageList{
        padding:.25em 0;
    }
    body>.chatRoomPage>.messageList>*{
        height:10.5em;
        overflow-y:scroll;
        overflow-anchor:none;
    }
    body>.chatRoomPage>.messageList>*>*{
        line-height:1.5;
        margin:.25em 0;
    }
    body>.chatRoomPage>.sendPanel>*{
        width:19em;
    }
`
export default RoomPage
