import doe from                 'doe'
import Variable from            '../../Variable.mjs'
import animationFrame from      './IdleKingdomGame/animationFrame.mjs'
import constant from            './IdleKingdomGame/constant.mjs'
function factoryRow(a,i){
    let s=constant.speed(i)
    return doe.div(
        doe.div(
            {className:'a'},
            a.image&&[doe.img({className:'a',src:a.image}),' '],
            doe.span(a.name),
        ),
        doe.div(
            {className:'b'},`${s<1e6?s:s.toPrecision(3)} GPS`
        ),
        this._node.factoryCount[i]=doe.div({className:'x'},),
        doe.div(
            {className:'y'},
            this._node.factoryPrice[i]=doe.span(),
            ' ',
            doe.img({className:'a',src:'gold.png'}),
        ),
        doe.div(
            {className:'z'},
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
            {className:'b'},
            this._node.goldSpan=doe.span(),
            ' ',
            doe.img({className:'a',src:'gold.png'}),
        ),
        doe.div(
            {className:'a'},
            constant.factory.map(factoryRow.bind(this)),
        ),
        doe.div(
            'Created by ',
            doe.a({href:'https://anliting.com/'},'An-Li Ting'),
            ' and ',
            doe.a({href:'https://chrysalis.tw/'},'Ivan Huang'),
            '.',
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
        gold:40,
        factory:constant.factory.map(_=>0),
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
    .idleKingdomGame>.b{
        height:2em;
    }
    .idleKingdomGame>.b>*{
        vertical-align:middle;
    }
    .idleKingdomGame>.b>.a{
        width:1em;
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
    .idleKingdomGame>.a>*>.a>*{
        vertical-align:middle;
    }
    .idleKingdomGame>.a>*>.a>.a{
        height:1.2em;
    }
    .idleKingdomGame>.a>*>.b{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.x{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.y{
        text-align:right;
    }
    .idleKingdomGame>.a>*>.y>*{
        vertical-align:middle;
    }
    .idleKingdomGame>.a>*>.y>.a{
        width:.6em;
    }
    .idleKingdomGame>.a>*>.z{
        text-align:right;
    }
`
export default IdleKingdomGame
