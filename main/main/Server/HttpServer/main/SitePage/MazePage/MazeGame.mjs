import doe from                 'doe'
import Variable from            '../../Variable.mjs'
import generateAStyleMaze from  './MazeGame/generateAStyleMaze.mjs'
let blockSize=16,width=44,height=28
function generateMaze(){
    let edgeCount=2*width*height-width-height,a=Array(edgeCount).fill(1)
    for(let e of generateAStyleMaze(width,height))
        a[e]=0
    return a
}
function drawMaze(zoom){
    zoom=Math.ceil(zoom)
    this._node.mazeCanvas.width=this._imageWidth*zoom
    this._node.mazeCanvas.height=this._imageHeight*zoom
    let context=this._node.mazeCanvas.getContext('2d')
    context.setTransform(zoom,0,0,zoom,0,0)
    context.clearRect(0,0,this._imageWidth,this._imageHeight)
    context.fillStyle='#bfbfbf'
    context.fillRect(0,0,this._imageWidth,1)
    context.fillRect(0,0,1,this._imageHeight)
    context.fillRect(
        0,height*(blockSize+1),this._imageWidth,1
    )
    context.fillRect(
        width*(blockSize+1),0,1,this._imageHeight
    )
    for(let i=0;i<width-1;i++)
    for(let j=0;j<height-1;j++)
        context.fillRect(
            (blockSize+1)*(i+1),
            (blockSize+1)*(j+1),
            1,1
        )
    for(let i=0;i<(width-1)*height;i++)
        if(this._maze[i]){
            let x=i%(width-1),y=~~(i/(width-1))
            context.fillRect(
                (blockSize+1)*(x+1),
                (blockSize+1)*y+1,
                1,blockSize
            )
        }
    for(let i=0;i<width*(height-1);i++)
        if(this._maze[(width-1)*height+i]){
            let x=i%width,y=~~(i/width)
            context.fillRect(
                (blockSize+1)*x+1,
                (blockSize+1)*(y+1),
                blockSize,1,
            )
        }
}
function draw(){
    if(this._drew)
        return
    this._drew=1
    let zoom=this._zoom*this._dpr
    this._node.canvas.width=Math.ceil(this._imageWidth*zoom)
    this._node.canvas.height=Math.ceil(this._imageHeight*zoom)
    drawMaze.call(this,zoom)
    let context=this._node.canvas.getContext('2d')
    context.setTransform(zoom,0,0,zoom,0,0)
    context.drawImage(
        this._node.mazeCanvas,0,0,this._imageWidth,this._imageHeight
    )
    context.shadowColor='rgba(0,0,0,.2)'
    context.shadowBlur=zoom
    context.shadowOffsetX=(
        blockSize*.3125+
        1+(blockSize+1)*(width-1)+
        blockSize*.5
    )*zoom
    context.shadowOffsetY=(
        blockSize*.0625+
        1+
        blockSize*.8125
    )*zoom
    context.fillStyle='#fff'
    context.beginPath()
    context.ellipse(
        -blockSize*.3125,
        -blockSize*.0625,
        blockSize*.3125,
        blockSize*.0625,
        0,
        0,
        2*Math.PI
    )
    context.fill()
    context.shadowColor='rgba(0,0,0,0)'
    context.drawImage(
        this._node.diamond,
        1+(blockSize+1)*(width-1)+blockSize*.125,
        1+blockSize*.125,
        blockSize*.75,
        blockSize*.75,
    )
    context.fillStyle='#afafff'
    context.beginPath()
    context.arc(
        1+(blockSize+1)*this._x+blockSize/2,
        1+(blockSize+1)*this._y+blockSize/2,
        blockSize/4,
        0,
        2*Math.PI
    )
    context.fill()
}
function MazeGame(){
    this._imageWidth=width*(blockSize+1)+1
    this._imageHeight=height*(blockSize+1)+1
    this._node={
        mazeCanvas:doe.canvas(),
        diamond:doe.img({src:'diamond-red.png'}),
    }
    this._queue=[]
    this.clear()
    this.node=this._node.div=doe.div(
        {className:'mazeGame'},
        this._node.canvas=doe.canvas({
            tabIndex:0,
            oncontextmenu:e=>{
                e.preventDefault()
                e.stopPropagation()
            },
            onkeydown:this.keyDown.bind(this),
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
MazeGame.prototype.animationFrame=function(){
    draw.call(this)
}
MazeGame.prototype.clear=function(){
    this._drew=0
    this._maze=generateMaze()
    this._x=0
    this._y=height-1
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
    /*this._queue.push([
        e.timeStamp*1e3,e.key.toLowerCase()
    ])*/
    this._drew=0
    if(e.key=='ArrowLeft')
        if(
            this._x&&
            !this._maze[this._y*(width-1)+this._x-1]
        )
            this._x--
    if(e.key=='ArrowRight')
        if(
            this._x<width-1&&
            !this._maze[this._y*(width-1)+this._x]
        )
            this._x++
    if(e.key=='ArrowUp')
        if(
            this._y&&
            !this._maze[
                (width-1)*height+
                (this._y-1)*width+this._x
            ]
        )
            this._y--
    if(e.key=='ArrowDown')
        if(
            this._y<height-1&&
            !this._maze[
                (width-1)*height+
                this._y*width+this._x
            ]
        )
            this._y++
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
