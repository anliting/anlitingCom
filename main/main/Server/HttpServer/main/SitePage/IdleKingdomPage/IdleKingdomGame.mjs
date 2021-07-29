import doe from                 'doe'
import Variable from            '../../Variable.mjs'
import animationFrame from      './IdleKingdomGame/animationFrame.mjs'
import constant from            './IdleKingdomGame/constant.mjs'
function factoryRow(a,i){
    return doe.div(
        doe.div(
            {className:'a'},
            a.name
        ),
        doe.div(
            {className:'e'},`${10**i} GPS`
        ),
        this._node.factoryCount[i]=doe.div({className:'b'},),
        this._node.factoryPrice[i]=doe.div(
            {className:'d'},`${8**i} G`
        ),
        doe.div(
            {className:'c'},
            this._node.factoryBuy[i]=doe.div({
                className:'button',
                onclick:e=>{
                    this._queue.push([
                        Math.floor(e.timeStamp*1e3)-this._startTime,
                        'buy',i
                    ])
                }
            },'+'),
            ' ',
            this._node.factorySell[i]=doe.div({
            className:'button',
                onclick:e=>{
                    this._queue.push([
                        Math.floor(e.timeStamp*1e3)-this._startTime,
                        'sell',i
                    ])
                }
            },'-'),
        ),
    )
}
function IdleKingdomGame(){
    this._node={
        factoryCount:{},
        factoryPrice:{},
        factoryBuy:{},
        factorySell:{},
    }
    this.node=this._node.div=doe.div(
        {className:'idleKingdomGame'},
        doe.div(
            '黃金：',
            this._node.goldSpan=doe.span(),
        ),
        doe.div(
            {className:'a'},
            constant.factory.map(factoryRow.bind(this)),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this._dpr=devicePixelRatio
        doe(this._node.div.style,{
            width:`${a[0]}px`,
            height:`${a[1]}px`,
        })
    })
}
IdleKingdomGame.prototype.animationFrame=animationFrame
IdleKingdomGame.prototype.start=function(){
    this._queue=[]
    this._status={
        time:0,
        gold:5,
        factory:[0,0,0,0,0,0,0],
    }
    this._startTime=Math.floor(1e3*performance.now())
}
IdleKingdomGame.style=`
    .idleKingdomGame{
        display:inline-block;
        position:relative;
        text-align:left;
        overflow-y:scroll;
    }
    .idleKingdomGame>.a{
        margin-top:.5em;
        display:table;
        width:calc(100% - .5em);
    }
    .idleKingdomGame>.a>*{
        display:table-row;
        height:2em;
    }
    .idleKingdomGame>.a>*>*{
        display:table-cell;
    }
    .idleKingdomGame>.a>*>.e{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.b{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.d{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.c{
        text-align:right;
    }
`
export default IdleKingdomGame
