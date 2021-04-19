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
                setPanel.call(this,this._notLoggedInPanel)
            }
        }),
        logInPanel=new LogInPanel(site,{
            back:()=>{
                setPanel.call(this,this._notLoggedInPanel)
            }
        })
    this._notLoggedInPanel=doe.div(
        doe.div('Register',{className:'button',onclick:()=>{
            setPanel.call(this,registerPanel.node)
            registerPanel.focus()
        }}),
        ' ',
        doe.div('Log In',{className:'button',onclick:()=>{
            setPanel.call(this,logInPanel.node)
            logInPanel.focus()
        }})
    )
    this._loggedInPanel=doe.div(
        doe.div('Log Out',{className:'button',onclick(){
            site.logOut()
        }})
    )
    this.node=doe.div(
        this._currentPanel=this._notLoggedInPanel,
    )
}
UserPanel.prototype.credential=function(status){
    setPanel.call(this,status?this._loggedInPanel:this._notLoggedInPanel)
}
export default UserPanel
