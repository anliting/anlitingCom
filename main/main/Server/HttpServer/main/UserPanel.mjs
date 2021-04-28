import doe from             'doe'
import RegisterPage from    './UserPanel/RegisterPage.mjs'
import LogInPanel from      './UserPanel/LogInPanel.mjs'
function setPanel(p){
    doe(this.node,
        1,this._currentPanel,
        0,p
    )
    this._currentPanel=p
}
function back(){
    this._logInPanel.clear()
    this.out.back()
}
function UserPanel(site){
    let
        registerPanel=new RegisterPage(site,{
            back:()=>{
                setPanel.call(this,this._homePanel)
                this._logInPanel.focus()
            }
        })
    this._logInPanel=new LogInPanel(site)
    this._logInPanel.out={
        submit:()=>{
            back.call(this)
        },
    }
    this._homePanel=doe.div(
        {className:'homePanel'},
        this._homePanelNotLoggedIn=doe.div(
            {className:'notLoggedIn'},
            doe.div(
                {className:'a'},
                doe.div(
                    {className:'a'},
                    doe.div('Back',{className:'button',onclick:()=>{
                        back.call(this)
                    }}),
                ),
                doe.div(
                    {className:'b'},
                    doe.div('Register',{className:'button',onclick:()=>{
                        setPanel.call(this,registerPanel.node)
                        registerPanel.focus()
                    }}),
                ),
            ),
            this._logInPanel.node,
        ),
        this._homePanelLoggedIn=doe.div(
            {className:'loggedIn'},
            n=>{doe(n.style,{display:'none'})},
            doe.div('Back',{className:'button',onclick:()=>{
                back.call(this)
            }}),
            ' ',
            doe.div('Log Out',{className:'button',onclick:()=>{
                site.logOut()
                this.out.logOut()
            }}),
            ' ',
            doe.div('Delete Current User',{className:'button',onclick:()=>{
                site.cutCurrentUser()
                back.call(this)
            }}),
        ),
    )
    this.node=doe.div(
        {className:'userPanel'},
        this._currentPanel=this._homePanel,
    )
}
UserPanel.prototype.focus=function(){
    this._logInPanel.focus()
}
UserPanel.prototype.credential=function(status){
    setPanel.call(this,this._homePanel)
    if(status){
        this._homePanelNotLoggedIn.style.display='none'
        this._homePanelLoggedIn.style.display=''
    }else{
        this._homePanelNotLoggedIn.style.display=''
        this._homePanelLoggedIn.style.display='none'
    }
}
export default UserPanel
