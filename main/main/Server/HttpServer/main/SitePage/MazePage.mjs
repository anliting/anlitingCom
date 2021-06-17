import doe from                 'doe'
import Stream from              '../Stream.mjs'
import Variable from            '../Variable.mjs'
import MazeGame from            './MazePage/MazeGame.mjs'
function MazePage(){
    this._game=new MazeGame
    this.out=new Stream
    this.node=doe.div(
        {className:'mazePage'},
        doe.div(
            {className:'a'},
            doe.div(
                {className:'a'},
                doe.div({
                    className:'button',
                    onclick:()=>{
                        this.out.in(['back'])
                    },
                },'Back'),
            ),
            doe.div(
                {className:'b'},
                doe.div({
                    className:'button',
                    onclick:()=>{
                        this.clear()
                    },
                },'New Game'),
            ),
        ),
        doe.div(
            {className:'b'},
            this._game.node,
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        let zoom=Math.min(a[0],a[1]/(3/4))
        this.node.style.setProperty('--zoom',''+zoom)
        this._game.size.value=[22/24*zoom,14/24*zoom]
    })
}
MazePage.prototype.animationFrame=function(t){
    this._game.animationFrame(t)
}
MazePage.prototype.clear=function(){
    this._game.start()
}
MazePage.prototype.focus=function(){
    this._game.focus()
}
MazePage.prototype.keyDown=function(e){
    this._game.keyDown(e)
}
MazePage.style=MazeGame.style+`
    body>.mazePage{
        display:inline-block;
        padding:1em;
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.mazePage>.a{
        display:table;
        width:100%;
    }
    body>.mazePage>.a>*{
        display:table-cell;
    }
    body>.mazePage>.a>.a{
        text-align:left;
    }
    body>.mazePage>.a>.b{
        text-align:right;
    }
    body>.mazePage>.b{
        margin-top:.25em;
        text-align:center;
        line-height:0;
        height:14em;
    }
    body>.mazePage>.b::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    body>.mazePage>.b>*{
        vertical-align:middle;
    }
`
export default MazePage
