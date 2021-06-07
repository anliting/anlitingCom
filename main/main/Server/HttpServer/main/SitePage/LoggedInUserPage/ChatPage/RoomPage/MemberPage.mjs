import doe from                 'doe'
import Stream from              '../../../../Stream.mjs'
import Variable from            '../../../../Variable.mjs'
function submit(){
    this._node.input.required=true
    if(this._node.input.checkVaildity()){
        this.out.in(['invite',+this._node.input.value])
        this.clear()
    }
}
function MemberPage(){
    this._node={}
    this.out=new Stream
    this.node=doe.div(
        {className:'chatRoomMemberPage'},
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
                    doe.div('Leave',{
                        className:'button',
                        onclick:()=>{
                            if(
                                confirm('Are you sure to leave this room?')
                            )
                                this.out.in(['leave'])
                        },
                    }),
                ),
            ),
        ),
        doe.div(
            {className:'invitePanel'},
            this._node.input=doe.input({
                placeholder:'User ID',
                pattern:'[0-9]+',
                onkeydown:e=>{
                    if(!(e.key=='Enter'))
                        return
                    submit.call(this)
                }
            }),
            doe.div('Invite',{
                className:'button',
                onclick:()=>{
                    submit.call(this)
                },
            }),
        ),
        /*doe.div({className:'messageList'},
            doe.div({onscroll:()=>{
                if(this._skipOnScroll)
                    return this._skipOnScroll=0
                setScrollRatio.call(this)
            }},n=>{
                this._node.messageList=n
                this.messageList.for(a=>{
                    let bottom=
                        !scrollTopMax(n)||
                        1<=this._scrollRatio
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
                    setScrollRatio.call(this)
                })
            })
        ),*/
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty(
            '--zoom',''+Math.min(a[0],a[1]/(16/22))
        )
    })
}
MemberPage.prototype.clear=function(){
    this._node.input.required=false
    this._node.input.value=''
}
MemberPage.style=`
    body>.chatRoomMemberPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.chatRoomMemberPage>.controlPanel>*{
        display:table;
        width:100%;
    }
    body>.chatRoomMemberPage>.controlPanel>*>.a{
        display:table-cell;
        text-align:left;
    }
    body>.chatRoomMemberPage>.controlPanel>*>.b{
        display:table-cell;
        text-align:right;
    }
    body>.chatRoomMemberPage>.invitePanel{
        margin-top:1em;
    }
`
export default MemberPage
