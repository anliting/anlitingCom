export default`
    body>.chatRoomPage{
        --lineCount:1;
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.chatRoomPage>.controlPanel>*{
        display:table;
        width:100%;
    }
    body>.chatRoomPage>.controlPanel>*>.a{
        display:table-cell;
        text-align:left;
    }
    body>.chatRoomPage>.controlPanel>*>.b{
        display:table-cell;
        text-align:right;
    }
    body>.chatRoomPage>.messageList{
        padding:.25em 0;
    }
    body>.chatRoomPage>.messageList>*{
        height:calc(
            16em - 1.75em - .25em - .25em - .25em -
            1.5em * var(--lineCount)
        );
        overflow-y:scroll;
        overflow-anchor:none;
        word-break:break-all;
        word-wrap:break-word;
    }
    body>.chatRoomPage>.messageList>*>*{
        line-height:1.5;
        margin:.25em 0;
        white-space:pre-wrap;
    }
    body>.chatRoomPage>.sendPanel{
        display:table;
    }
    body>.chatRoomPage>.sendPanel>*{
        display:table-cell;
        vertical-align:bottom;
    }
    body>.chatRoomPage>.sendPanel>.a>*{
        resize:none;
        width:calc(22em - 1em - 3em - 1em);
        height:calc(1.5em * var(--lineCount));
        background-color:#bfbfbf;
        margin:0;
        padding:.125em .5em;
        border:none;
        outline:none;
        font-size:1em;
        vertical-align:top;
        font-family:serif;
        line-height:1.5;
    }
    body>.chatRoomPage>.sendPanel>.b>*{
        width:3em;
    }
`
