import dt from                  'dt'
let speed=32000e-6
function move(a,b,c,d){
    function da(ax,ay,bx,by){
        return ax*by-ay*bx
    }
    function between(ax,ay,bx,by){
        return ax*bx+ay*by<=0
    }
    let
        a2bx=b.x-a.x,
        a2cx=c.x-a.x,
        a2dx=d.x-a.x,
        b2cx=c.x-b.x,
        b2dx=d.x-b.x,
        a2by=b.y-a.y,
        a2cy=c.y-a.y,
        a2dy=d.y-a.y,
        b2cy=c.y-b.y,
        b2dy=d.y-b.y,
        d0=da(a2bx,a2by,a2cx,a2cy),
        d1=da(a2bx,a2by,a2dx,a2dy),
        d2=da(a2cx,a2cy,a2dx,a2dy),
        d3=da(b2cx,b2cy,b2dx,b2dy)
    if(!d0&&between(a2cx,a2cy,b2cx,b2cy))
        return c
    let
        touchA=!d2&&between(a2cx,a2cy,a2dx,a2dy),
        touchB=!d3&&between(b2cx,b2cy,b2dx,b2dy)
    if(touchA&&touchB)
        return between(a2bx,a2by,a2cx,a2cy)?a:b
    if(touchA)
        return a
    if(touchB)
        return b
    if(!d1&&between(a2dx,a2dy,b2dx,b2dy))
        return d
    if(d0*d1<0&&d2*d3<0){
        let
            a0=a.y-b.y,b0=b.x-a.x,c0=BigInt(a.x*b.y-a.y*b.x),
            a1=c.y-d.y,b1=d.x-c.x,c1=BigInt(c.x*d.y-c.y*d.x),
            det=BigInt(a0*b1-a1*b0)
        return new dt.Vector2(
            Number((BigInt(b0)*c1-BigInt(b1)*c0)/det),
            Number((c0*BigInt(a1)-c1*BigInt(a0))/det),
        )
    }
}
function positionTo(status,t){
    if(!+status.direction)
        return
    let
        step=Math.floor(
            (t-status.time)*speed/status.direction
        ),
        newPosition=status.position.newAdd(
            status.direction.newMulN(step)
        )
    function consider(wallX,wallY,wallWidth,wallHeight){
        wallX=wallX*1e3+500
        wallY=wallY*1e3+500
        let p=move(
            new dt.Vector2(wallX,wallY),
            new dt.Vector2(wallX+wallWidth*1e3,wallY+wallHeight*1e3),
            status.position,
            newPosition,
        )
        if(p)
            step=Math.min(step,
                Math.ceil(
                    p.sub(status.position)/
                    status.direction
                )-1
            )
    }
    for(let i=0;i<(this._width-1)*this._height;i++)
        if(status.maze[i]){
            let x=i%(this._width-1),y=~~(i/(this._width-1))
            consider.call(this,
                (this._blockSize+1)*(x+1),
                (this._blockSize+1)*y,
                0,
                this._blockSize+1,
            )
        }
    for(let i=0;i<this._width*(this._height-1);i++)
        if(status.maze[(this._width-1)*this._height+i]){
            let x=i%this._width,y=~~(i/this._width)
            consider.call(this,
                (this._blockSize+1)*x,
                (this._blockSize+1)*(y+1),
                this._blockSize+1,
                0,
            )
        }
    consider.call(this,
        0,
        0,
        0,
        this._height*(this._blockSize+1),
    )
    consider.call(this,
        this._width*(this._blockSize+1),
        0,
        0,
        this._height*(this._blockSize+1),
    )
    consider.call(this,
        0,
        0,
        this._width*(this._blockSize+1),
        0,
    )
    consider.call(this,
        0,
        this._height*(this._blockSize+1),
        this._width*(this._blockSize+1),
        0,
    )
    if(step){
        this._drew=0
        status.position.add(
            status.direction.newMulN(step)
        )
    }
}
export default positionTo
