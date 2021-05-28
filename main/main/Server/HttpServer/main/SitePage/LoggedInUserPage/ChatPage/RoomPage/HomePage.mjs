import doe from                 'doe'
import Stream from              '../../../../Stream.mjs'
import Variable from            '../../../../Variable.mjs'
import createControlPanel from  './HomePage/createControlPanel.mjs'
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
function HomePage(){
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
            this._node.input=doe.textarea({onkeydown:e=>{
                if(!e.shiftKey&&e.key=='Enter'){
                    e.preventDefault()
                    e.stopPropagation()
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
HomePage.prototype.focus=function(){
    this._node.input.focus()
}
HomePage.prototype.scrollToBottom=function(){
    this._skipOnScroll=1
    this._scrollRatio=1
    reactScrollRatioToScrollTop.call(this)
}
HomePage.style=`
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
        white-space:pre-wrap;
    }
    body>.chatRoomPage>.sendPanel>*{
        resize:none;
        width:19em;
        height:1.2em;
        background-color:#bfbfbf;
        margin:0;
        padding:.275em .5em;
        border:none;
        outline:none;
        font-size:1em;
        vertical-align:top;
        font-family:monospace;
    }
`
export default HomePage
