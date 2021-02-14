import doe from         'doe'
import Connection from  './main/Connection.mjs'
let connection=new Connection
;(async()=>{
    await connection.load
    connection.out={
        credential(){
            console.log('credential',connection.credential)
        }
    }
    let passwordInput
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
            doe.input({placeholder:'Username'}),
            passwordInput=doe.input({placeholder:'Password'}),
            doe.button('Log In',{onclick(){
                connection.logIn(0,passwordInput.value)
            }}),
            doe.button('Log Out',{onclick(){
                connection.logOut()
            }}),
        ),
    )
})()
navigator.serviceWorker.register('%23sw')
