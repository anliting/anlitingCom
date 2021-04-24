import doe from             'doe'
import RegisterPanel from   './UserPanel/RegisterPanel.mjs'
import LogInPanel from      './UserPanel/LogInPanel.mjs'
function setPanel(p){
    doe(this.node,
        1,this._currentPanel,
        0,this._currentPanel=p
    )
}
function UserPanel(site){
    let
        registerPanel=new RegisterPanel(site,{
            back:()=>{
                setPanel.call(this,this._homePanel)
                this._logInPanel.focus()
            }
        })
    this._logInPanel=new LogInPanel(site)
    this._homePanel=doe.div(
        this._homePanelNotLoggedIn=doe.div(
            doe.div('Cancel',{className:'button',onclick:()=>{
                // clear log in panel
                this.out.back()
            }}),
            ' ',
            doe.div('Register',{className:'button',onclick:()=>{
                setPanel.call(this,registerPanel.node)
                registerPanel.focus()
            }}),
            this._logInPanel.node,
        ),
        this._homePanelLoggedIn=doe.div(
            n=>{doe(n.style,{display:'none'})},
            doe.div('Log Out',{className:'button',onclick(){
                site.logOut()
            }}),
            ' ',
            doe.div('Delete Current User',{className:'button',onclick:()=>{
                site.cutCurrentUser()
            }}),
        ),
    )
    this.node=doe.div(
        {className:'userPanel'},
        n=>{doe(n.style,{height:'8.5em'})},
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
