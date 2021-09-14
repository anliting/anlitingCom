import doe from         'doe'
import{Stream}from      'dt'
import Variable from    '../../Variable.mjs'
import RegisterPanel from   './RegisterPage/RegisterPanel.mjs'
function RegisterPage(site){
    this.out=new Stream
    this._status='form'
    this._registerPanel=new RegisterPanel
    this._registerPanel.out.out(a=>{
        switch(a[0]){
            case'status':
                if(a[1]=='form'){
                    this._backButton.classList.remove('disabled')
                }else if(a[1]=='inProgress'){
                    if(!this._backButton.classList.contains('disabled'))
                        this._backButton.classList.add('disabled')
                }else if(a[1]=='done'){
                    this._backButton.classList.remove('disabled')
                }
                this._status=a[1]
            break
            case'putUser':
                this.out.in(a)
            break
        }
    })
    this.node=doe.div(
        {className:'registerPage',},
        doe.div(
            this._backButton=doe.div('Back',{
                className:'button',
                onclick:()=>{
                    if(['form','done'].includes(this._status)){
                        this._registerPanel.clear()
                        this.out.in(['back'])
                    }
                }
            }),
        ),
        this._registerPanel.node
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
RegisterPage.prototype.focus=function(){
    this._registerPanel.focus()
}
RegisterPage.style=`
    body>.registerPage{
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
    body>.registerPage>.registerPanel{
        margin-top:1em;
        box-shadow:0 -.05em rgba(0,0,0,.2);
        padding-top:1em;
    }
`
export default RegisterPage
