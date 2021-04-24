import doe from         'doe'
async function submit(){
    let putUser=this._site.putUser(this._passwordInput.value)
    this._passwordInput.value=''
    let beingRegisteredDiv,completeDiv
    doe(this.node,
        1,this._form,0,
        beingRegisteredDiv=doe.div(
            'The registration is in progress.'
        )
    )
    let userId=await putUser
    doe(this.node,
        1,beingRegisteredDiv,0,
        completeDiv=doe.div(
            `The registration is complete. The user ID is ${userId}. `,
            doe.div({className:'button',onclick:()=>{
                doe(this.node,
                    1,completeDiv,0,
                    this._form
                )
                this._out.back()
            }},'Back')
        )
    )
}
function RegisterPanel(site,out){
    this._out=out
    this._site=site
    this.node=doe.div(
        this._form=doe.div(
            {onkeydown:e=>{
                if(e.key=='Enter')
                    submit.call(this)
            }},
            doe.div(
                doe.div('Back',{className:'button',onclick:()=>{
                    this._passwordInput.value=''
                    this._out.back()
                }}),
            ),
            doe.div(
                n=>{doe(n.style,{marginTop:'.5em'})},
                this._passwordInput=doe.input({
                    placeholder:'Password',
                    type:'password'
                }),
            ),
            doe.div(
                n=>{doe(n.style,{marginTop:'.5em'})},
                doe.div('Register',{className:'button',onclick:()=>{
                    submit.call(this)
                }}),
            )
        )
    )
}
RegisterPanel.prototype.focus=function(){
    this._passwordInput.focus()
}
export default RegisterPanel
