import doe from             'doe'
import RegisterPage from    './UserPage/RegisterPage.mjs'
import LogInPage from       './UserPage/LogInPage.mjs'
import Variable from        '../Variable.mjs'
import Stream from          '../Stream.mjs'
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
UserPage.style=`
    .logInPanel>.a{
        text-align:center;
    }
    .logInPanel>.b{
        margin-top:.5em;
        text-align:center;
    }
    .logInPanel>.c{
        margin-top:.5em;
        text-align:right;
    }
    body>.logInPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.logInPage input.id:invalid{
        box-shadow:
            0 0 .125em rgba(255,0,0,.8),
            .125em .125em .125em rgba(255,0,0,.4);
    }
    body>.logInPage>.a{
        display:table;
        width:100%;
    }
    body>.logInPage>.a>*{
        display:table-cell;
    }
    body>.logInPage>.a>.a{
        text-align:left;
    }
    body>.logInPage>.a>.b{
        text-align:right;
    }
    body>.logInPage>.logInPanel{
        margin-top:1em;
        box-shadow:0 -.05em rgba(0,0,0,.2);
        padding-top:1em;
    }
`
export default UserPage
