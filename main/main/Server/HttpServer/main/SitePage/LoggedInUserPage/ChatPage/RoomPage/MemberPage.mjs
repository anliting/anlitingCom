import doe from                 'doe'
import Variable from            '../../../../Variable.mjs'
function submit(){
    this._node.input.required=true
    if(this._node.input.checkValidity()){
        this._out(['invite',+this._node.input.value])
        this.clear()
    }
}
function MemberPage(out){
    this._node={}
    this._out=out
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
                            this._out(['back'])
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
                                this._out(['leave'])
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
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
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
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
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
