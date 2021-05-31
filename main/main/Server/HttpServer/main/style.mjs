export default`
    .button{
        display:inline-block;
        padding:.125em .5em;
        background-color:#3f3f3f;
        color:#fff;
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        user-select:none;
        text-align:center;
        font-family:sans-serif;
        line-height:1.5em;
        vertical-align:top;
    }
    .button:not(.disabled):hover{
        background-color:#4f4f4f;
    }
    .button:not(.disabled):active{
        background-color:#1f1f1f;
    }
    .button.disabled{
        color:#7f7f7f;
    }
    .item{
        box-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        background-color:#9f9f9f;
    }
    .button.item:not(.disabled):hover{
        background-color:#afafaf;
    }
    .button.item:not(.disabled):active{
        background-color:#8f8f8f;
    }
    .registerPanel>.form>*>.a{
        margin:0 auto;
    }
    .registerPanel>.form>*>.c{
        margin:.25em auto 0;
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
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        overflow:hidden;
        text-align:center;
    }
    body>*{
        text-align:left;
    }
    body::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    a{
        color:#fff;
    }
    ul{
        padding-left:1em;
    }
    input{
        width:12em;
        height:1.5em;
        background-color:#bfbfbf;
        padding:.125em .5em;
        border:none;
        outline:none;
        font-size:1em;
        vertical-align:top;
    }
    body>.homePage{
        display:inline-block;
        padding:1em 1em 0 0;
        width:21em;
        height:15em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.homePage>.a{
        padding-left:1em;
        text-align:right;
        height:1.75em;
    }
    body>.homePage>.a>.loggedInUserPageButton{
        min-width:2em;
    }
    body>.homePage>.b{
        margin-top:1em;
        padding-left:1em;
        height:11.25em;
    }
    body>.homePage>.b>*+*{
        margin-top:1em;
    }
    body>.homePage>.c{
        font-size:.5em;
        height:2em;
        line-height:2em;
        width:min-content;
    }
    body>.homePage>.c:not(.connected){
        animation-duration:1.5s;
        animation-name:notConnectedBeat;
        animation-direction:alternate;
        animation-timing-function:linear;
    }
    body>.homePage>.c:not(.connected)::after{
        margin:0 .5em;
        content:'Disconnected';
    }
    body>.homePage>.c.connected{
        animation-duration:1.5s;
        animation-name:connectedBeat;
        animation-direction:alternate;
        animation-timing-function:linear;
    }
    body>.homePage>.c.connected::after{
        margin:0 .5em;
        content:'Connected';
    }
    @keyframes notConnectedBeat{
        0%{
            background-color:rgba(191,0,0,.5);
        }
        20%{
            background-color:rgba(191,0,0,1);
        }
        40%{
            background-color:rgba(191,0,0,.5);
        }
        60%{
            background-color:rgba(191,0,0,1);
        }
        80%{
            background-color:rgba(191,0,0,.5);
        }
        100%{
            background:none;
        }
    }
    @keyframes connectedBeat{
        0%{
            background-color:rgba(0,191,0,.5);
        }
        20%{
            background-color:rgba(0,191,0,1);
        }
        40%{
            background-color:rgba(0,191,0,.5);
        }
        60%{
            background-color:rgba(0,191,0,1);
        }
        80%{
            background-color:rgba(0,191,0,.5);
        }
        100%{
            background:none;
        }
    }
    body>.registerPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.registerPage>.registerPanel{
        margin-top:1em;
        box-shadow:0 -.05em rgba(0,0,0,.2);
        padding-top:1em;
    }
    body>.loggedInUserPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.loggedInUserPage>*+*{
        margin-top:1em;
    }
`
