import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        '../Variable.mjs'
import{Stream}from          'dt'
function UserPage(){
    this.out=new Stream
    this._registerPage=new RegisterPage
    this._registerPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value.off()
                this.page.value=this._logInPage
            break
            case'putUser':
                this.out.in(a)
            break
        }
    })
    this._logInPage=new LogInPage
    this._logInPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.out.in(['back'])
            break
            case'logIn':
                this.out.in(a)
                this.out.in(['back'])
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
