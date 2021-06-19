import dt from'dt'
function drawMaze(zoom,status){
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
        0,this._height*(this._blockSize+1),this._imageWidth,1
    )
    context.fillRect(
        this._width*(this._blockSize+1),0,1,this._imageHeight
    )
    for(let i=0;i<this._width-1;i++)
    for(let j=0;j<this._height-1;j++)
        context.fillRect(
            (this._blockSize+1)*(i+1),
            (this._blockSize+1)*(j+1),
            1,1
        )
    for(let i=0;i<(this._width-1)*this._height;i++)
        if(status.maze[i]){
            let x=i%(this._width-1),y=~~(i/(this._width-1))
            context.fillRect(
                (this._blockSize+1)*(x+1),
                (this._blockSize+1)*y+1,
                1,this._blockSize
            )
        }
    for(let i=0;i<this._width*(this._height-1);i++)
        if(status.maze[(this._width-1)*this._height+i]){
            let x=i%this._width,y=~~(i/this._width)
            context.fillRect(
                (this._blockSize+1)*x+1,
                (this._blockSize+1)*(y+1),
                this._blockSize,1,
            )
        }
}
function draw(status){
    if(this._drew)
        return
    this._drew=1
    let zoom=this._zoom*this._dpr
    this._node.canvas.width=Math.ceil(this._imageWidth*zoom)
    this._node.canvas.height=Math.ceil(this._imageHeight*zoom)
    drawMaze.call(this,zoom,status)
    let context=this._node.canvas.getContext('2d')
    context.setTransform(zoom,0,0,zoom,0,0)
    context.drawImage(
        this._node.mazeCanvas,0,0,this._imageWidth,this._imageHeight
    )
    context.shadowColor='rgba(0,0,0,.2)'
    context.shadowBlur=zoom
    context.shadowOffsetX=(
        this._blockSize*.3125+
        1+(this._blockSize+1)*(this._width-1)+
        this._blockSize*.5
    )*zoom
    context.shadowOffsetY=(
        this._blockSize*.0625+
        1+
        this._blockSize*.8125
    )*zoom
    context.fillStyle='#fff'
    context.beginPath()
    context.ellipse(
        -this._blockSize*.3125,
        -this._blockSize*.0625,
        this._blockSize*.3125,
        this._blockSize*.0625,
        0,
        0,
        2*Math.PI
    )
    context.fill()
    context.shadowColor='rgba(0,0,0,0)'
    context.drawImage(
        this._node.diamond,
        1+(this._blockSize+1)*(this._width-1)+this._blockSize*.125,
        1+this._blockSize*.125,
        this._blockSize*.75,
        this._blockSize*.75,
    )
    context.fillStyle='#fff'
    context.beginPath()
    context.arc(
        ...status.position,
        this._blockSize/4,
        0,
        2*Math.PI
    )
    context.fill()
    context.fillStyle='#afafff'
    context.beginPath()
    context.arc(
        1+(this._blockSize+1)*status.x+this._blockSize/2,
        1+(this._blockSize+1)*status.y+this._blockSize/2,
        this._blockSize/4,
        0,
        2*Math.PI
    )
    context.fill()
}
export default draw
