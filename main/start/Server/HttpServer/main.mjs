import doe from         'doe'
doe.body(
    doe.div('This is An-Li Ting\'s personal website.'),
    doe.div(
        n=>{doe(n.style,{marginTop:'1em'})},
        'You might also want to visit ',
        doe.a({href:'https://althea.anliting.com/'},'my blog'),
        '.'
    ),
    /*doe.div(
        n=>{doe(n.style,{marginTop:'1em'})},
        doe.input({placeholder:'Username'}),
        doe.input({placeholder:'Password'}),
        doe.button('Log In'),
    ),*/
)
navigator.serviceWorker.register('%23sw')
