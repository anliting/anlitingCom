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
    input:invalid{
        box-shadow:inset 0 0 .125em .0625em rgba(255,0,0,.8);
    }
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
    body>.connectionStatusPanel{
        position:fixed;
        z-index:-1;
        left:0;
        top:0;
        width:100%;
        height:100%;
    }
    body>.connectionStatusPanel>*{
        position:absolute;
        left:0;
        bottom:0;
        font-size:calc(var(--zoom) * .5 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        height:2em;
        line-height:2em;
        width:min-content;
    }
    body>.connectionStatusPanel>.changed:not(.connected){
        animation-duration:.5s;
        animation-name:notConnectedBeat;
        animation-direction:alternate;
        animation-timing-function:linear;
    }
    body>.connectionStatusPanel>:not(.connected)::after{
        margin:0 .5em;
        content:'Offline';
    }
    body>.connectionStatusPanel>.changed.connected{
        animation-duration:.5s;
        animation-name:connectedBeat;
        animation-direction:alternate;
        animation-timing-function:linear;
    }
    body>.connectionStatusPanel>.connected::after{
        margin:0 .5em;
        content:'Online';
    }
    @keyframes notConnectedBeat{
        0%{
            background-color:rgba(191,0,0,1);
        }
        100%{
            background:none;
        }
    }
    @keyframes connectedBeat{
        0%{
            background-color:rgba(0,191,0,1);
        }
        100%{
            background:none;
        }
    }
`
