import doe from         'doe'
import RegisterPanel from './newUserPanel/RegisterPanel.mjs'
function newUserPanel(site){
    let
        notLoggedInPanel,
        loggedInPanel,
        registerPanel=new RegisterPanel(site),
        logInPanel,
        idInput,
        panel,
        currentPanel
    registerPanel.out={
        back(){
            setPanel(notLoggedInPanel)
        }
    }
    function setPanel(p){
        doe(panel,
            1,currentPanel,
            0,currentPanel=p
        )
    }
    notLoggedInPanel=doe.div(
        doe.div('Register',{className:'button',onclick(){
            setPanel(registerPanel.node)
            registerPanel.focus()
        }}),
        ' ',
        doe.div('Log In',{className:'button',onclick(){
            setPanel(logInPanel)
            idInput.focus()
        }})
    )
    loggedInPanel=doe.div(
        doe.div('Log Out',{className:'button',onclick(){
            site.logOut()
        }})
    )
    {
        let passwordInput
        function cancel(){
            idInput.value=''
            passwordInput.value=''
            setPanel(notLoggedInPanel)
        }
        function submit(){
            site.logIn(+idInput.value,passwordInput.value)
            idInput.value=''
            passwordInput.value=''
        }
        logInPanel=doe.div(
            {onkeydown(e){
                if(e.key=='Enter')
                    submit()
            }},
            doe.div(
                n=>{doe(n.style,{margin:'.5em 0'})},
                doe.div('Cancel',{className:'button',onclick(){
                    cancel()
                }}),
            ),
            doe.div(
                n=>{doe(n.style,{margin:'.5em 0'})},
                idInput=doe.input({placeholder:'ID'}),
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
                doe.div('Log In',{className:'button',onclick(){
                    submit()
                }}),
            ),
        )
    }
    return{
        node:panel=doe.div(
            currentPanel=notLoggedInPanel,
        ),
        credential(status){
            setPanel(status?loggedInPanel:notLoggedInPanel)
        },
    }
}
export default newUserPanel
