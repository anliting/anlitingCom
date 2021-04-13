import doe from         'doe'
import Site from  './main/Site.mjs'
let site=new Site,userPanel=newUserPanel()
site.out={
    credential(){
        userPanel.credential(site.credential)
    }
}
doe.body(
    doe.div('This is An-Li Ting\'s personal website.'),
    doe.div(
        n=>{doe(n.style,{marginTop:'1em'})},
        'You might also want to visit ',
        doe.a({href:'https://althea.anliting.com/'},'my blog'),
        '.'
    ),
    doe.div(
        n=>{doe(n.style,{marginTop:'1em'})},
        userPanel.node,
    )
)
function newUserPanel(){
    let
        notLoggedInPanel,
        loggedInPanel,
        registerPanel,
        logInPanel,
        idInput,
        passwordInput,
        panel,
        currentPanel
    function setPanel(p){
        doe(panel,
            1,currentPanel,
            0,currentPanel=p
        )
    }
    notLoggedInPanel=doe.div(
        doe.button('Register',{onclick(){
            setPanel(registerPanel)
            passwordInput.focus()
        }}),
        doe.button('Log In',{onclick(){
            setPanel(logInPanel)
            idInput.focus()
        }})
    )
    loggedInPanel=doe.div(
        doe.button('Log Out',{onclick(){
            site.logOut()
        }})
    )
    {
        let form
        function cancel(){
            passwordInput.value=''
            setPanel(notLoggedInPanel)
        }
        async function submit(){
            let putUser=site.putUser(passwordInput.value)
            passwordInput.value=''
            let beingRegisteredDiv
            doe(registerPanel,
                1,form,0,
                beingRegisteredDiv=doe.div(
                    'The registration is in progress. '
                )
            )
            let userId=await putUser
            doe(registerPanel,
                1,beingRegisteredDiv,0,
                doe.div(
                    `The registration is complete. The user ID is ${userId}.`
                )
            )
        }
        registerPanel=doe.div(
            form=doe.div(
                {onkeydown(e){
                    if(e.key=='Enter')
                        submit()
                }},
                doe.button('Cancel',{onclick(){
                    cancel()
                }}),
                passwordInput=doe.input({
                    placeholder:'Password',
                    type:'password'
                }),
                doe.button('Register',{onclick(){
                    submit()
                }}),
            )
        )
    }
    {
        let passwordInput
        function cancel(){
            idInput.value=''
            passwordInput.value=''
            setPanel(notLoggedInPanel)
        }
        function submit(){
            site.logIn(+idInput,passwordInput.value)
            idInput.value=''
            passwordInput.value=''
        }
        logInPanel=doe.div(
            {onkeydown(e){
                if(e.key=='Enter')
                    submit()
            }},
            doe.button('Cancel',{onclick(){
                cancel()
            }}),
            idInput=doe.input({placeholder:'ID'}),
            passwordInput=doe.input({
                placeholder:'Password',
                type:'password'
            }),
            doe.button('Log In',{onclick(){
                submit()
            }}),
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
navigator.serviceWorker.register('%23sw')
