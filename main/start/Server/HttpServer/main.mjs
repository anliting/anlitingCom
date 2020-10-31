import doe from         'doe'
doe.body(
    doe.div('This is An-Li Ting\'s personal website.'),
    doe.div(
        doe.input({placeholder:'Username'}),
        doe.input({placeholder:'Password'}),
        doe.button('Log In'),
    ),
)
