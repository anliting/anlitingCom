import doe from         'doe'
async function submit(){
    this._status='inProgress'
    this._backButton.classList.add('disabled')
    let putUser=this._site.putUser(this._passwordInput.value)
    this._passwordInput.value=''
    let beingRegisteredDiv
    doe(this.node,
        beingRegisteredDiv=doe.div(
            {className:'body',},
            'The registration is in progress.'
        ),
        1,this._form,
    )
    let userId=await putUser
    this._status='done'
    this._backButton.classList.remove('disabled')
    doe(this.node,
        this._completeDiv=doe.div(
            {className:'body',},
            `The registration is complete. The user ID is ${userId}.`,
        ),
        1,beingRegisteredDiv,
    )
}
function RegisterPage(site,out){
    this._out=out
    this._site=site
    this._status='form'
    this.node=doe.div(
        {className:'registerPage',},
        doe.div(
            this._backButton=doe.div('Back',{
                className:'button',
                onclick:()=>{
                    if(this._status=='form'){
                        this._passwordInput.value=''
                        this._out.back()
                    }else if(this._status=='inProgress'){
                    }else if(this._status=='done'){
                        this._status='form'
                        doe(this.node,
                            this._form,
                            1,this._completeDiv
                        )
                        this._out.back()
                    }
                }
            }),
        ),
        this._form=doe.div(
            {className:'body',},
            doe.div(
                {
                    className:'registerPanel',
                    onkeydown:e=>{
                        if(e.key=='Enter')
                            submit.call(this)
                    },
                },
                doe.div(
                    {className:'a'},
                    this._passwordInput=doe.input({
                        placeholder:'Password',
                        type:'password'
                    }),
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
RegisterPage.prototype.focus=function(){
    this._passwordInput.focus()
}
export default RegisterPage
