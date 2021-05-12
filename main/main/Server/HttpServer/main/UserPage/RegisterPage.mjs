import doe from         'doe'
import Variable from    '../Variable.mjs'
async function submit(){
    this._status='inProgress'
    this._out.status('inProgress')
    let putUser=this._site.putUser(this._passwordInput.value)
    this._passwordInput.value=''
    let beingRegisteredDiv
    doe(this.node,
        1,this._form,0,
        beingRegisteredDiv=doe.div(
            'The registration is in progress.'
        ),
    )
    let userId=await putUser
    this._status='done'
    this._out.status('done')
    doe(this.node,
        1,beingRegisteredDiv,0,
        this._completeDiv=doe.div(
            `The registration is complete. The user ID is ${userId}.`,
        ),
    )
}
function RegisterPanel(site,out){
    this._out=out
    this._site=site
    this._status='form'
    this.node=doe.div(
        {className:'registerPanel',},
        this._form=doe.div(
            {className:'form',},
            doe.div(
                {
                    onkeydown:e=>{
                        if(e.key=='Enter')
                            submit.call(this)
                    },
                },
                doe.div(
                    {className:'a'},
                    this._passwordInput=doe.input({
                        autocomplete:'new-password',
                        placeholder:'Password',
                        type:'password',
                    }),
                ),
                doe.div(
                    {className:'c'},
                    "For an account, its password is a secret character string used to authenticate user's identity. You have to provide it when you log in.",
                ),
                doe.div(
                    {className:'b'},
                    doe.div('Register',{className:'button',onclick:()=>{
                        submit.call(this)
                    }}),
                ),
            ),
        )
    )
}
RegisterPanel.prototype.clear=function(){
    if(this._status=='form'){
        this._passwordInput.value=''
    }else if(this._status=='done'){
        doe(this.node,
            1,this._completeDiv,0,
            this._form,
        )
    }
    this._status='form'
}
RegisterPanel.prototype.focus=function(){
    this._passwordInput.focus()
}
function RegisterPage(site,out){
    this._out=out
    this._status='form'
    this._registerPanel=new RegisterPanel(site,{
        status:status=>{
            if(status=='form'){
                this._backButton.classList.remove('disabled')
            }else if(status=='inProgress'){
                if(!this._backButton.classList.contains('disabled'))
                    this._backButton.classList.add('disabled')
            }else if(status=='done'){
                this._backButton.classList.remove('disabled')
            }
            this._status=status
        },
    })
    this.node=doe.div(
        {className:'registerPage',},
        doe.div(
            this._backButton=doe.div('Back',{
                className:'button',
                onclick:()=>{
                    if(['form','done'].includes(this._status)){
                        this._registerPanel.clear()
                        this._out.back()
                    }
                }
            }),
        ),
        this._registerPanel.node
    )
    this.size=new Variable([1,1])
    this.size.for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
RegisterPage.prototype.focus=function(){
    this._registerPanel.focus()
}
export default RegisterPage