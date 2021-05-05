export default`
    .logInPanel>.a{
        text-align:center;
    }
    .logInPanel>.b{
        margin-top:.5em;
        text-align:center;
    }
    .logInPanel>.c{
        margin-top:.5em;
        text-align:right;
    }
    .registerPanel>.form>*>.a{
        margin:0 auto;
        width:20em;
    }
    .registerPanel>.form>*>.c{
        margin:.25em auto 0;
        width:20em;
    }
    .registerPanel>.form>*>.b{
        margin-top:.5em;
        text-align:right;
    }
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
    .button:hover{
        background-color:#4f4f4f;
    }
    .button:active{
        background-color:#1f1f1f;
    }
    .button.disabled{
        color:#7f7f7f;
    }
    body>.homePage{
        margin:0 auto;
        padding:15px;
        width:450px;
        height:450px;
    }
    body>.homePage>.a{
        text-align:right;
    }
    body>.homePage>.b{
        margin-top:1em;
    }
    body>.logInPage{
        margin:0 auto;
        padding:15px;
        width:450px;
        height:450px;
    }
    body>.logInPage input.id:invalid{
        box-shadow:
            0 0 .125em rgba(255,0,0,.8),
            .125em .125em .125em rgba(255,0,0,.4);
    }
    body>.logInPage>.a{
        display:table;
        width:100%;
    }
    body>.logInPage>.a>*{
        display:table-cell;
    }
    body>.logInPage>.a>.a{
        text-align:left;
    }
    body>.logInPage>.a>.b{
        text-align:right;
    }
    body>.logInPage>.logInPanel{
        margin-top:1em;
        box-shadow:
            0 0 .1em rgba(0,0,0,.4),
            .1em .1em .1em rgba(0,0,0,.2);
        padding:.5em;
    }
    body>.registerPage{
        margin:0 auto;
        padding:15px;
        width:450px;
        height:450px;
    }
    body>.registerPage>.registerPanel{
        margin-top:1em;
        box-shadow:
            0 0 .1em rgba(0,0,0,.4),
            .1em .1em .1em rgba(0,0,0,.2);
        padding:.5em;
    }
    body>.loggedInUserPage{
        margin:0 auto;
        padding:15px;
        width:450px;
        height:450px;
    }
`
