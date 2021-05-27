import doe from                 'doe'
import Stream from              '../../../Stream.mjs'
import Variable from            '../../../Variable.mjs'
import createControlPanel from  './RoomPage/createControlPanel.mjs'
function scrollTopMax(n){
    return n.scrollHeight-n.clientHeight
}
function reactScrollRatioToScrollTop(){
    this._node.messageList.scrollTop=
        this._scrollRatio*
        scrollTopMax(this._node.messageList)
}
function setScrollRatio(){
    this._scrollRatio=
        this._node.messageList.scrollTop/
        scrollTopMax(this._node.messageList)
}
function RoomPage(){
    this._node={}
    this._scrollRatio=1
    this._skipOnScroll=0
    this.messageList=new Variable([])
    this.out=new Stream
    this.node=doe.div(
        {className:'chatRoomPage'},
        createControlPanel.call(this),
        doe.div({className:'messageList'},
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
        ),
        doe.div(
            {className:'sendPanel'},
            this._node.input=doe.input({onkeydown:e=>{
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
        reactScrollRatioToScrollTop.call(this)
    })
}
RoomPage.prototype.focus=function(){
    this._node.input.focus()
}
RoomPage.prototype.scrollToBottom=function(){
    this._skipOnScroll=1
    this._scrollRatio=1
    reactScrollRatioToScrollTop.call(this)
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
        word-break:break-all;
        word-wrap:break-word;
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
