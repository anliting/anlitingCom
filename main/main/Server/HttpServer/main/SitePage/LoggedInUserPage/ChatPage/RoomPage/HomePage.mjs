import doe from                 'doe'
import Stream from              '../../../../Stream.mjs'
import Variable from            '../../../../Variable.mjs'
import createControlPanel from  './HomePage/createControlPanel.mjs'
import style from               './HomePage/style.mjs'
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
function submit(){
    this.out.in(['putMessage',this._node.input.value])
    clearInput.call(this)
}
function clearInput(){
    this._node.input.value=''
    this.node.style.setProperty('--lineCount',1)
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
            doe.div(
                {className:'a'},
                this._node.input=doe.textarea({oninput:e=>{
                    this.node.style.setProperty(
                        '--lineCount',
                        ''+Math.min(4.5,e.target.value.split('\n').length)
                    )
                },onkeydown:e=>{
                    if(!e.shiftKey&&e.key=='Enter'){
                        e.preventDefault()
                        e.stopPropagation()
                        submit.call(this)
                    }
                }}),
            ),
            doe.div(
                {className:'b'},
                doe.div('Send',{
                    className:'button',
                    onclick:()=>{
                        submit.call(this)
                    },
                }),
            ),
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
HomePage.prototype.clear=function(){
    clearInput.call(this)
}
HomePage.prototype.focus=function(){
    this._node.input.focus()
}
HomePage.prototype.scrollToBottom=function(){
    this._skipOnScroll=1
    this._scrollRatio=1
    reactScrollRatioToScrollTop.call(this)
}
HomePage.style=style
export default HomePage