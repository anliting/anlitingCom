import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        './Variable.mjs'
function back(){
    this._logInPage.clear()
    this.out.back()
}
function UserPage(site,out){
    this.out=out
    let
        registerPage=new RegisterPage(site,{
            back:()=>{
                this.page.value=this._logInPage
                this._logInPage.focus()
            },
        })
    this._logInPage=new LogInPage
    this._logInPage.out.out(a=>{
        switch(a[0]){
            case'back':
                back.call(this)
            break
            case'logIn':
                site.logIn(a[1],a[2])
                back.call(this)
            break
            case'register':
                this.page.value=registerPage
                registerPage.focus()
            break
        }
    })
    this.page=new Variable(this._logInPage)
}
UserPage.prototype.focus=function(){
    this._logInPage.focus()
}
export default UserPage
