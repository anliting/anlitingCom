import doe from                 'doe'
import Variable from            '../Variable.mjs'
import Stream from              '../Stream.mjs'
import generateAStyleMaze from  './MazePage/generateAStyleMaze.mjs'
let blockWidth=8
let width=10,height=10
function generateMaze(){
    let edgeCount=2*width*height-width-height
    let a=Array(edgeCount)
    for(let i=0;i<edgeCount;i++)
        a[i]=1
    for(let e of generateAStyleMaze(width,height))
        a[e]=0
    return a
}
function MazePage(){
    this.credential=new Variable
    this.out=new Stream
    this._node={}
    this._maze=generateMaze()
    this.node=doe.div(
        {className:'mazePage'},
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
            this._node.canvas=doe.canvas(),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        let zoom=Math.min(a[0],a[1]/(3/4))
        this.node.style.setProperty('--zoom',''+zoom)
        this._node.canvas.width=(14/24)*zoom
        this._node.canvas.height=(14/24)*zoom
        let context=this._node.canvas.getContext('2d')
        context.setTransform((14/24)*zoom,0,0,(14/24)*zoom,0,0)
        context.clearRect(0,0,1,1)
        let imageWidth=10*(blockWidth+1)+1,imageHeight=10*(blockWidth+1)+1
        context.fillStyle='#fff'
        context.fillRect(0,0,1,1/imageHeight)
        context.fillRect(0,0,1/imageWidth,1)
        context.fillRect(0,10*(blockWidth+1)/imageHeight,1,1/imageHeight)
        context.fillRect(10*(blockWidth+1)/imageWidth,0,1/imageWidth,1)
        for(let i=0;i<9;i++)
        for(let j=0;j<9;j++)
            context.fillRect(
                (blockWidth+1)*(i+1)/imageWidth,
                (blockWidth+1)*(j+1)/imageHeight,
                1/imageWidth,1/imageHeight
            )
        context.fillStyle='#fff'
        for(let i=0;i<(width-1)*height;i++)
            if(this._maze[i]){
                let x=i%(width-1),y=~~(i/(width-1))
                context.fillRect(
                    (blockWidth+1)*(x+1)/imageWidth,
                    ((blockWidth+1)*y+1)/imageHeight,
                    1/imageWidth,blockWidth/imageHeight
                )
            }
        for(let i=0;i<width*(height-1);i++)
            if(this._maze[(width-1)*height+i]){
                let x=i%width,y=~~(i/width)
                context.fillRect(
                    ((blockWidth+1)*x+1)/imageWidth,
                    (blockWidth+1)*(y+1)/imageHeight,
                    blockWidth/imageWidth,1/imageHeight
                )
            }
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
    body>.mazePage>.b{
        margin-top:.25em;
        text-align:center;
    }
`
export default MazePage
