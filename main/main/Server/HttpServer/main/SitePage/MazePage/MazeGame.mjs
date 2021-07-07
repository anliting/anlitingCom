import doe from                 'doe'
import dt from                  'dt'
import Variable from            '../../Variable.mjs'
import generateAStyleMaze from  './MazeGame/generateAStyleMaze.mjs'
import animationFrame from      './MazeGame/animationFrame.mjs'
function generateMaze(){
    let
        edgeCount=2*this._width*this._height-this._width-this._height,
        a=Array(edgeCount).fill(1)
    for(let e of generateAStyleMaze(this._width,this._height))
        a[e]=0
    return a
}
function MazeGame(){
    this._imageWidth=this._width*(this._blockSize+1)+1
    this._imageHeight=this._height*(this._blockSize+1)+1
    this._node={
        diamond:doe.img({src:'diamond-red.png'}),
    }
    this._queue=[]
    this._status={}
    this._cache={
        mazeCanvas:doe.canvas(),
    }
    this.node=this._node.div=doe.div(
        {className:'mazeGame'},
        this._node.canvas=doe.canvas({
            tabIndex:0,
            oncontextmenu:e=>{
                e.preventDefault()
                e.stopPropagation()
            },
            onkeydown:this.keyDown.bind(this),
            onkeyup:this.keyUp.bind(this),
        }),
    )
    this.size=new Variable([1,1]).for(a=>{
        this._drew=0
        this._dpr=devicePixelRatio
        this._node.canvas.style.setProperty('--dpr',''+this._dpr)
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
MazeGame.prototype._width=50
MazeGame.prototype._height=50
MazeGame.prototype.animationFrame=animationFrame
MazeGame.prototype.start=function(){
    this._startTime=Math.floor(1e3*performance.now())
    this._drew=0
    this._status={
        time:0,
        key:{},
        maze:generateMaze.call(this),
        direction:new dt.Vector2,
        position:new dt.Vector2(
            (1+this._blockSize/2)*1e3,
            ((this._blockSize+1)*(this._height-1)+1+this._blockSize/2)*1e3
        ),
        viewPosition:new dt.Vector2(
            (1+this._blockSize/2)*1e3,
            ((this._blockSize+1)*(this._height-1)+1+this._blockSize/2)*1e3
        ),
        viewVelocity:new dt.Vector2,
    }
}
MazeGame.prototype.focus=function(){
    this._node.canvas.focus()
}
MazeGame.prototype.keyDown=function(e){
    if(!(
        !e.repeat
    ))
        return
    e.preventDefault()
    e.stopPropagation()
    this._queue.push([
        Math.floor(e.timeStamp*1e3)-this._startTime,'keyDown',e.key
    ])
}
MazeGame.prototype.keyUp=function(e){
    e.preventDefault()
    e.stopPropagation()
    this._queue.push([
        Math.floor(e.timeStamp*1e3)-this._startTime,'keyUp',e.key
    ])
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
