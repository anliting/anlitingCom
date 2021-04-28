import doe from             'doe'
import LogInPanel from      './LogInPage/LogInPanel.mjs'
function LogInPage(site,out){
    this._out=out
    this._logInPanel=new LogInPanel(site)
    this._logInPanel.out={
        submit:()=>{
            this._out.submit()
        },
    }
    this.node=doe.div(
        {className:'notLoggedIn'},
        doe.div(
            {className:'a'},
            doe.div(
                {className:'a'},
                doe.div('Back',{className:'button',onclick:()=>{
                    this._out.back()
                }}),
            ),
            doe.div(
                {className:'b'},
                doe.div('Register',{className:'button',onclick:()=>{
                    this._out.register()
                }}),
            ),
        ),
        this._logInPanel.node,
    )
}
LogInPage.prototype.clear=function(){
    this._logInPanel.clear()
}
LogInPage.prototype.focus=function(){
    this._logInPanel.focus()
}
export default LogInPage
