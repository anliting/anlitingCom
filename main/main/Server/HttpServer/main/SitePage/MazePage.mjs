import doe from                 'doe'
import Variable from            '../Variable.mjs'
import Stream from              '../Stream.mjs'
import generateAStyleMaze from  './MazePage/generateAStyleMaze.mjs'
let blockSize=8,width=44,height=28
function generateMaze(){
    let edgeCount=2*width*height-width-height,a=Array(edgeCount).fill(1)
    for(let e of generateAStyleMaze(width,height))
        a[e]=0
    return a
}
function draw(){
    let
        imageWidth=width*(blockSize+1)+1,
        imageHeight=height*(blockSize+1)+1,
        zoom=this._zoom*Math.min((22/24)*1/imageWidth,(14/24)*1/imageHeight)*this._dpr
    this._node.canvas.width=imageWidth*zoom*this._dpr
    this._node.canvas.height=imageHeight*zoom*this._dpr
    let context=this._node.canvas.getContext('2d')
    context.setTransform(zoom,0,0,zoom,0,0)
    context.clearRect(0,0,imageWidth,imageHeight)
    context.fillStyle='#fff'
    context.fillRect(0,0,imageWidth,1)
    context.fillRect(0,0,1,imageHeight)
    context.fillRect(
        0,height*(blockSize+1),imageWidth,1
    )
    context.fillRect(
        width*(blockSize+1),0,1,imageHeight
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
                ((blockSize+1)*y+1),
                1,blockSize
            )
        }
    for(let i=0;i<width*(height-1);i++)
        if(this._maze[(width-1)*height+i]){
            let x=i%width,y=~~(i/width)
            context.fillRect(
                ((blockSize+1)*x+1),
                (blockSize+1)*(y+1),
                blockSize,1,
            )
        }
    context.fillStyle='#afafff'
    context.beginPath()
    context.arc(
        (1+blockSize/2),
        (1+(blockSize+1)*(height-1)+blockSize/2),
        (blockSize/4),
        0,
        2*Math.PI
    )
    context.fill()
    context.fillStyle='#7fff7f'
    context.beginPath()
    context.arc(
        (1+(blockSize+1)*(width-1)+blockSize/2),
        (1+blockSize/2),
        (blockSize/4),
        0,
        2*Math.PI
    )
    context.fill()
}
function MazePage(){
    this.credential=new Variable
    this.out=new Stream
    this._node={}
    this._queue=[]
    this._maze=generateMaze()
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
                        this._maze=generateMaze()
                        draw.call(this)
                    },
                },'New Maze'),
            ),
        ),
        doe.div(
            {className:'b'},
            this._node.canvas=doe.canvas({
                tabIndex:0,
                onkeydown:e=>{
                    if(!e.repeat)
                        this._queue.push([
                            e.timeStamp*1e3,e.key.toLowerCase()
                        ])
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this._dpr=devicePixelRatio
        this.node.style.setProperty('--dpr',''+this._dpr)
        let zoom=Math.min(a[0],a[1]/(3/4))
        this._zoom=zoom
        this.node.style.setProperty('--zoom',''+zoom)
        draw.call(this)
    })
}
MazePage.style=`
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
    }
    body>.mazePage>.b>*{
        outline:none;
        transform-origin:top left;
        transform:scale(calc(1 / var(--dpr)));
    }
`
export default MazePage
