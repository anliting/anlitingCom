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
HomePage.prototype.focus=function(){
    this._node.input.focus()
}
HomePage.prototype.scrollToBottom=function(){
    this._skipOnScroll=1
    this._scrollRatio=1
    reactScrollRatioToScrollTop.call(this)
}
export default HomePage
