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
    let notLoggedInPanel,loggedInPanel,logInPanel,idInput,panel,currentPanel
    function setPanel(p){
        doe(panel,
            1,currentPanel,
            0,currentPanel=p
        )
    }
    notLoggedInPanel=doe.div(
        doe.button('Register',{onclick(){
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
        let passwordInput
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
