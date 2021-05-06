import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        './Variable.mjs'
function back(){
    this._logInPage.clear()
    this.out.back()
}
function UserPage(site,out){
    let currentPage=new Variable
    this.out=out
    let
        registerPage=new RegisterPage(site,{
            back:()=>{
                currentPage.value=this._logInPage
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
            currentPage.value=registerPage
            registerPage.focus()
        },
    })
    currentPage.value=this._logInPage
    this.page=currentPage
}
UserPage.prototype.focus=function(){
    this._logInPage.focus()
}
export default UserPage
