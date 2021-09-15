import doe from                 'doe'
import{Stream}from              'dt'
import Variable from            '../Variable.mjs'
import IdleKingdomGame from     './IdleKingdomPage/IdleKingdomGame.mjs'
function IdleKingdomPage(){
    this._game=new IdleKingdomGame
    this.out=new Stream
    this.node=doe.div(
        {className:'idleKingdomPage'},
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
IdleKingdomPage.prototype.animationFrame=function(t){
    this._game.animationFrame(t)
}
IdleKingdomPage.prototype.start=function(){
    this._game.start()
}
IdleKingdomPage.style=IdleKingdomGame.style+`
    body>.idleKingdomPage{
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
    body>.idleKingdomPage>.a{
        display:table;
        width:100%;
    }
    body>.idleKingdomPage>.a>*{
        display:table-cell;
    }
    body>.idleKingdomPage>.a>.a{
        text-align:left;
    }
    body>.idleKingdomPage>.b{
        margin-top:.25em;
        text-align:center;
        height:14em;
    }
    body>.idleKingdomPage>.b::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    body>.idleKingdomPage>.b>*{
        vertical-align:middle;
    }
`
export default IdleKingdomPage
