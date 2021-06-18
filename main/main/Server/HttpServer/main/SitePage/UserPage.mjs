import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        '../Variable.mjs'
import{Stream}from          'dt'
function back(){
    this._logInPage.clear()
    this.out.in(['back'])
}
function UserPage(){
    this.out=new Stream
    let registerPage=new RegisterPage
    registerPage.out.out(a=>{
        switch(a[0]){
            case'back':
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
                back.call(this)
            break
            case'logIn':
                this.out.in(a)
                back.call(this)
            break
            case'register':
                this.page.value=registerPage
            break
        }
    })
    this.page=new Variable(this._logInPage)
}
UserPage.style=LogInPage.style
export default UserPage
