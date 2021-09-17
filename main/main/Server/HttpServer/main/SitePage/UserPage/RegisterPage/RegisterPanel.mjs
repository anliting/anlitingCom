import doe from         'doe'
async function submit(){
    this._status='inProgress'
    this._out(['status','inProgress'])
    let putUser=new Promise(rs=>
        this._out(['putUser',this._passwordInput.value,rs])
    )
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
    this._out(['status','done'])
    doe(this.node,
        1,beingRegisteredDiv,0,
        this._completeDiv=doe.div(
            `The registration is complete. The user ID is ${userId}.`,
        ),
    )
}
function RegisterPanel(out){
    this._out=out
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
export default RegisterPanel
