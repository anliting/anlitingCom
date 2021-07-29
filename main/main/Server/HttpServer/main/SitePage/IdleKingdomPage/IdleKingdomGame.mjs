import doe from                 'doe'
import dt from                  'dt'
import Variable from            '../../Variable.mjs'
import animationFrame from      './IdleKingdomGame/animationFrame.mjs'
function MazeGame(){
    this._node={
    }
    this._cache={
    }
    this.node=this._node.div=doe.div(
        {className:'mazeGame'},
    )
    this.size=new Variable([1,1]).for(a=>{
        this._drew=0
        this._dpr=devicePixelRatio
        this._zoom=Math.min(
            a[0]/this._view.x,
            a[1]/this._view.y
        )
        doe(this._node.div.style,{
            width:`${this._zoom*this._view.x}px`,
            height:`${this._zoom*this._view.y}px`
        })
    })
}
MazeGame.prototype._blockSize=16
MazeGame.prototype._view=new dt.Vector2(16,9).mulN(
    MazeGame.prototype._blockSize
)
MazeGame.prototype.animationFrame=animationFrame
MazeGame.prototype.start=function(){
    this._drew=0
    this._queue=[]
    this._status={
        time:0,
    }
    this._startTime=Math.floor(1e3*performance.now())
}
MazeGame.style=`
    .mazeGame{
        display:inline-block;
        position:relative;
        text-align:left;
    }
    .mazeGame>*{
        position:absolute;
        outline:none;
        transform-origin:top left;
        transform:scale(calc(1 / var(--dpr)));
    }
`
export default MazeGame
