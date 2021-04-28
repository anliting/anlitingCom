import doe from         'doe'
async function submit(){
    this._status='inProgress'
    this._out.status('inProgress')
    let putUser=this._site.putUser(this._passwordInput.value)
    this._passwordInput.value=''
    let beingRegisteredDiv
    doe(this._registerPanelNode,
        beingRegisteredDiv=doe.div(
            'The registration is in progress.'
        ),
        1,this._form,
    )
    let userId=await putUser
    this._status='done'
    this._out.status('done')
    doe(this._registerPanelNode,
        this._completeDiv=doe.div(
            `The registration is complete. The user ID is ${userId}.`,
        ),
        1,beingRegisteredDiv,
    )
}
function RegisterPanel(site,out){
    this._out=out
    this._site=site
    this._status='form'
    this.node=this._registerPanelNode=doe.div(
        {className:'body',},
        this._form=doe.div(
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
RegisterPanel.prototype.clear=function(){
    if(this._status=='form'){
        this._passwordInput.value=''
    }else if(this._status=='done'){
        doe(this._registerPanelNode,
            this._form,
            1,this._completeDiv
        )
    }
}
RegisterPanel.prototype.focus=function(){
    this._passwordInput.focus()
}
function RegisterPage(site,out){
    this._out=out
    this._status='form'
    this._registerPanel=new RegisterPanel(site,{
        status:status=>{
            this._status=status
            if(this._status=='form'){
                this._backButton.classList.remove('disabled')
            }else if(this._status=='inProgress'){
                if(!this._backButton.classList.contains('disabled'))
                    this._backButton.classList.add('disabled')
            }else if(this._status=='done'){
                this._backButton.classList.remove('disabled')
            }
        },
    })
    this.node=doe.div(
        {className:'registerPage',},
        doe.div(
            this._backButton=doe.div('Back',{
                className:'button',
                onclick:()=>{
                    if(this._status=='form'){
                        this._registerPanel.clear()
                        this._out.back()
                    }else if(this._status=='inProgress'){
                    }else if(this._status=='done'){
                        this._status='form'
                        this._registerPanel.clear()
                        this._out.back()
                    }
                }
            }),
        ),
        this._registerPanel.node
    )
}
RegisterPage.prototype.focus=function(){
    this._registerPanel.focus()
}
export default RegisterPage
