import doe from             'doe'
import Variable from        '../../Variable.mjs'
function ChangePasswordPage(out){
    this._out=out
    this.node=doe.div(
        {className:'changePasswordPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this._out(['back'])
                }
            }),
        ),
        doe.div(
            doe.div('Save',{
                className:'button',
                onclick:()=>{
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
ChangePasswordPage.style=`
    body>.changePasswordPage{
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
`
export default ChangePasswordPage
