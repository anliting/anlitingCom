import doe from             'doe'
import LogInPanel from      './LogInPage/LogInPanel.mjs'
import Stream from          '../../Stream.mjs'
import Variable from        '../../Variable.mjs'
function LogInPage(){
    this.out=new Stream
    this._logInPanel=new LogInPanel
    this._logInPanel.out.to(this.out)
    this.node=doe.div(
        {className:'logInPage'},
        doe.div(
            {className:'a'},
            doe.div(
                {className:'a'},
                doe.div('Back',{className:'button',onclick:()=>{
                    this.out.in(['back'])
                }}),
            ),
            doe.div(
                {className:'b'},
                doe.div('Register',{className:'button',onclick:()=>{
                    this.out.in(['register'])
                }}),
            ),
        ),
        this._logInPanel.node,
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
LogInPage.prototype.clear=function(){
    this._logInPanel.clear()
}
LogInPage.prototype.focus=function(){
    this._logInPanel.focus()
}
export default LogInPage
