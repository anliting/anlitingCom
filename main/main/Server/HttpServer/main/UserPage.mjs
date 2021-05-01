import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
function setPanel(p){
    doe(this.node,1,this._currentPanel,0,p)
    this._currentPanel=p
}
function back(){
    this._logInPage.clear()
    this.out.back()
}
function UserPage(site,out){
    this.out=out
    let
        registerPage=new RegisterPage(site,{
            back:()=>{
                setPanel.call(this,this._logInPage.node)
                this._logInPage.focus()
            },
        })
    this._logInPage=new LogInPage(site,{
        back:()=>{
            back.call(this)
        },
        submit:()=>{
            back.call(this)
        },
        register:()=>{
            setPanel.call(this,registerPage.node)
            registerPage.focus()
        },
    })
    this.node=doe.div(
        {className:'userPage'},
        this._currentPanel=this._logInPage.node,
    )
}
UserPage.prototype.focus=function(){
    this._logInPage.focus()
}
export default UserPage
