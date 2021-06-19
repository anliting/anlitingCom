import doe from                 'doe'
import dt from                  'dt'
import Variable from            '../../Variable.mjs'
import generateAStyleMaze from  './MazeGame/generateAStyleMaze.mjs'
import draw from                './MazeGame/draw.mjs'
let speed=64e-6
function generateMaze(){
    let
        edgeCount=2*this._width*this._height-this._width-this._height,
        a=Array(edgeCount).fill(1)
    for(let e of generateAStyleMaze(this._width,this._height))
        a[e]=0
    return a
}
let debug=0
function segment(aPosition,aVector,bPosition,bVector){
    if(!aVector.area(bVector))
        return
    let
        a0=aVector.y,
        b0=-aVector.x,
        c0=aVector.x*aPosition.y-aVector.y*aPosition.x,
        a1=bVector.y,
        b1=-bVector.x,
        c1=bVector.x*bPosition.y-bVector.y*bPosition.x,
        x=(b0*c1-b1*c0)/(a0*b1-a1*b0),
        y=(c0*a1-c1*a0)/(a0*b1-a1*b0)
    return new dt.Vector2(x,y)
}
function move(wallX,wallY,wallWidth,wallHeight,position,direction,length){
    if(!debug&&direction.len){
        debug=1
        let s=segment(
            new dt.Vector2(wallX,wallY),
            new dt.Vector2(0,wallHeight),
            position,
            direction.newMulN(length),
        )
        console.log(s)
            //wallX,wallY,wallWidth,wallHeight,position,direction,length
    }
}
function positionTo(t){
    for(let i=0;i<(this._width-1)*this._height;i++)
        if(this._status.maze[i]){
            let x=i%(this._width-1),y=~~(i/(this._width-1))
            move(
                (this._blockSize+1)*(x+1),
                (this._blockSize+1)*y+1,
                1,
                this._blockSize,
                this._status.position,
                this._status.direction,
                (t-this._status.time)*speed,
            )
        }
    for(let i=0;i<this._width*(this._height-1);i++)
        if(this._status.maze[(this._width-1)*this._height+i]){
            let x=i%this._width,y=~~(i/this._width)
            move(
                (this._blockSize+1)*x+1,
                (this._blockSize+1)*(y+1),
                this._blockSize,
                1,
                this._status.position,
                this._status.direction,
                (t-this._status.time)*speed,
            )
        }
    this._status.position.add(
        this._status.direction.newMulN((t-this._status.time)*speed)
    )
}
function MazeGame(){
    this._blockSize=16
    this._width=44
    this._height=28
    this._imageWidth=this._width*(this._blockSize+1)+1
    this._imageHeight=this._height*(this._blockSize+1)+1
    this._node={
        mazeCanvas:doe.canvas(),
        diamond:doe.img({src:'diamond-red.png'}),
    }
    this._queue=[]
    this._status={}
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
        this._zoom=Math.min(a[0]/this._imageWidth,a[1]/this._imageHeight)
        doe(this._node.div.style,{
            width:`${this._imageWidth*this._zoom}px`,
            height:`${this._imageHeight*this._zoom}px`
        })
    })
}
MazeGame.prototype.animationFrame=function(t){
    t=Math.floor(1e3*t)-this._startTime
    while(
        this._queue.length
    ){
        this._drew=0
        let a=this._queue.shift()
        positionTo.call(this,a[0])
        if({
            'ArrowLeft':1,
            'ArrowRight':1,
            'ArrowUp':1,
            'ArrowDown':1,
        }[a[2]]){
            if(a[1]=='keyDown'){
                this._status.key[a[2]]=1
                if(a[2]=='ArrowLeft')
                    if(
                        this._status.x&&
                        !this._status.maze[
                            this._status.y*(this._width-1)+this._status.x-1
                        ]
                    )
                        this._status.x--
                if(a[2]=='ArrowRight')
                    if(
                        this._status.x<this._width-1&&
                        !this._status.maze[
                            this._status.y*(this._width-1)+this._status.x
                        ]
                    )
                        this._status.x++
                if(a[2]=='ArrowUp')
                    if(
                        this._status.y&&
                        !this._status.maze[
                            (this._width-1)*this._height+
                            (this._status.y-1)*this._width+this._status.x
                        ]
                    )
                        this._status.y--
                if(a[2]=='ArrowDown')
                    if(
                        this._status.y<this._height-1&&
                        !this._status.maze[
                            (this._width-1)*this._height+
                            this._status.y*this._width+this._status.x
                        ]
                    )
                        this._status.y++
            }
            if(a[1]=='keyUp'){
                this._status.key[a[2]]=0
            }
        }
        this._status.direction=new dt.Vector2(
                (this._status.key.ArrowLeft?-1:0)+
                (this._status.key.ArrowRight?1:0)
            ,
                (this._status.key.ArrowUp?-1:0)+
                (this._status.key.ArrowDown?1:0)
        )
        let l=this._status.direction.len
        if(l)
            this._status.direction.divN(l)
        this._status.time=a[0]
    }
    this._drew=0
    positionTo.call(this,t)
    this._status.time=t
    draw.call(this,this._status)
}
MazeGame.prototype.start=function(){
    this._startTime=Math.floor(1e3*performance.now())
    this._drew=0
    this._status={
        time:0,
        key:{},
        maze:generateMaze.call(this),
        direction:new dt.Vector2,
        x:0,
        y:this._height-1,
        position:new dt.Vector2(
            1+this._blockSize/2,
            (this._blockSize+1)*(this._height-1)+1+this._blockSize/2
        ),
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
