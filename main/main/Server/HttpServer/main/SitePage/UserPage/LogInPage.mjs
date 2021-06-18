import doe from             'doe'
import LogInPanel from      './LogInPage/LogInPanel.mjs'
import{Stream}from          'dt'
import Variable from        '../../Variable.mjs'
function LogInPage(){
    this.out=new Stream
    this._logInPanel=new LogInPanel
    this._logInPanel.out.to(this.out)
    this.node=doe.div(
        {className:'logInPage'},
        doe.div(
            {className:'a'},
            doe.div(
                {className:'a'},
                doe.div('Back',{className:'button',onclick:()=>{
                    this.out.in(['back'])
                }}),
            ),
            doe.div(
                {className:'b'},
                doe.div('Register',{className:'button',onclick:()=>{
                    this.out.in(['register'])
                }}),
            ),
        ),
        this._logInPanel.node,
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
LogInPage.prototype.clear=function(){
    this._logInPanel.clear()
}
LogInPage.prototype.focus=function(){
    this._logInPanel.focus()
}
LogInPage.style=`
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
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
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
export default LogInPage
