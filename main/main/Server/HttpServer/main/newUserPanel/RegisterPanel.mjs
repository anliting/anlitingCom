import doe from         'doe'
function RegisterPanel(site){
    let node,form,passwordInput
    async function submit(){
        let putUser=site.putUser(passwordInput.value)
        passwordInput.value=''
        let beingRegisteredDiv,completeDiv
        doe(node,
            1,form,0,
            beingRegisteredDiv=doe.div(
                'The registration is in progress.'
            )
        )
        let userId=await putUser
        doe(node,
            1,beingRegisteredDiv,0,
            completeDiv=doe.div(
                `The registration is complete. The user ID is ${userId}. `,
                doe.div({className:'button',onclick:()=>{
                    doe(node,
                        1,completeDiv,0,
                        form
                    )
                    this.out.back()
                }},'Back')
            )
        )
    }
    this.node=node=doe.div(
        form=doe.div(
            {onkeydown:e=>{
                if(e.key=='Enter')
                    submit.call(this)
            }},
            doe.div(
                n=>{doe(n.style,{margin:'.5em 0'})},
                doe.div('Cancel',{className:'button',onclick:()=>{
                    passwordInput.value=''
                    this.out.back()
                }}),
            ),
            doe.div(
                n=>{doe(n.style,{margin:'.5em 0'})},
                passwordInput=doe.input({
                    placeholder:'Password',
                    type:'password'
                }),
            ),
            doe.div(
                n=>{doe(n.style,{margin:'.5em 0'})},
                doe.div('Register',{className:'button',onclick:()=>{
                    submit.call(this)
                }}),
            )
        )
    )
    this.focus=()=>{
        passwordInput.focus()
    }
}
export default RegisterPanel
