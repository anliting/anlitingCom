import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        '../Variable.mjs'
function UserPage(out){
    this._out=out
    this._registerPage=new RegisterPage(a=>{
        switch(a[0]){
            case'back':
                this.page.value.off()
                this.page.value=this._logInPage
            break
            case'putUser':
                this._out(a)
            break
        }
    })
    this._logInPage=new LogInPage(a=>{
        switch(a[0]){
            case'back':
                this._out(['back'])
            break
            case'logIn':
                this._out(a)
                this._out(['back'])
            break
            case'register':
                this.page.value.off()
                this.page.value=this._registerPage
            break
        }
    })
    this.page=new Variable(this._logInPage)
}
UserPage.style=LogInPage.style+RegisterPage.style
UserPage.prototype.off=function(){
    this.page.value.off()
    this.page.value=this._logInPage
}
export default UserPage
