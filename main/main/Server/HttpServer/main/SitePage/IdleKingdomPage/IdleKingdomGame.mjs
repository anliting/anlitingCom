import doe from                 'doe'
import Variable from            '../../Variable.mjs'
import animationFrame from      './IdleKingdomGame/animationFrame.mjs'
function IdleKingdomGame(){
    this._node={
    }
    this.node=this._node.div=doe.div(
        {className:'idleKingdomGame'},
    )
    this.size=new Variable([1,1]).for(a=>{
        this._dpr=devicePixelRatio
        doe(this._node.div.style,{
            width:`${a[0]}px`,
            height:`${a[1]}px`
        })
    })
}
IdleKingdomGame.prototype.animationFrame=animationFrame
IdleKingdomGame.prototype.start=function(){
    this._queue=[]
    this._status={
        time:0,
    }
    this._startTime=Math.floor(1e3*performance.now())
}
IdleKingdomGame.style=`
    .idleKingdomGame{
        display:inline-block;
        position:relative;
        text-align:left;
    }
`
export default IdleKingdomGame
