export default`
    html{
        height:100%;
    }
    body{
        margin:0;
        height:100%;
        background-color:#7f7f7f;
        line-height:1.2;
        color:#fff;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        /*overflow:hidden;*/
    }
    a{
        color:#fff;
    }
    input{
        height:1.5em;
        background-color:#bfbfbf;
        padding:.125em .5em;
        border:none;
        outline:none;
        font-size:16px;
        vertical-align:top;
    }
    .button{
        display:inline-block;
        padding:.125em .5em;
        background-color:#3f3f3f;
        color:#fff;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        user-select:none;
        text-align:center;
        font-family:sans-serif;
        font-size:16px;
        line-height:1.5em;
        vertical-align:top;
    }
    .button.disabled{
        color:#7f7f7f;
    }
    body>.homePage{
        margin:0 auto;
        padding:1em;
        width:540px;
    }
    body>.homePage>.a{
        text-align:right;
    }
    body>.homePage>.b{
        margin-top:1em;
    }
    body>.userPage{
        margin:0 auto;
        padding:1em;
        width:540px;
        height:8.5em;
    }
    body>.userPage input.id:invalid{
        box-shadow:0 0 .125em .0625em red;
    }
    body>.userPage>.homePanel>.notLoggedIn>.a{
        display:table;
        width:100%;
    }
    body>.userPage>.homePanel>.notLoggedIn>.a>*{
        display:table-cell;
    }
    body>.userPage>.homePanel>.notLoggedIn>.a>.a{
        text-align:left;
    }
    body>.userPage>.homePanel>.notLoggedIn>.a>.b{
        text-align:right;
    }
    body>.userPage .registerPage>.body{
        margin-top:1em;
    }
    body>.userPage .registerPanel>*{
        margin-top:.5em;
    }
    body>.userPage .registerPanel>.a{
        text-align:center;
    }
    body>.userPage .registerPanel>.b{
        text-align:right;
    }
    body>.userPage .logInPanel{
        margin-top:1em;
    }
    body>.userPage .logInPanel>*{
        margin-top:.5em;
    }
    body>.userPage .logInPanel>.a{
        text-align:center;
    }
    body>.userPage .logInPanel>.b{
        text-align:right;
    }
    /*.userPage{
        box-shadow:
            0 0 .1em rgba(0,0,0,.4),
            .1em .1em .1em rgba(0,0,0,.2);
        padding:.5em;
    }*/
`
