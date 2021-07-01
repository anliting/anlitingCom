import dt from                  'dt'
let speed=64e-3
function segmentIntersection(a,b,c,d){
    function da(ax,ay,bx,by){
        return ax*by-ay*bx
    }
    function between(ax,ay,bx,by){
        return ax*ay+bx*by<=0
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
    return!d0&&between(a2cx,a2cy,b2cx,b2cy)||
        !d1&&between(a2dx,a2dy,b2dx,b2dy)||
        !d2&&between(a2cx,a2cy,a2dx,a2dy)||
        !d3&&between(b2cx,b2cy,b2dx,b2dy)||
        d0*d1<0&&d2*d3<0
}
function move(
    wallX,wallY,wallWidth,wallHeight,position,direction,displacement
){
    let
        wallPosition=new dt.Vector2(wallX,wallY),
        newPosition=position.newAdd(displacement)
    if(wallWidth){
        if(direction.y){
            if(segmentIntersection(
                wallPosition,
                new dt.Vector2(wallX+wallWidth,wallY),
                position,
                newPosition,
            )){
                let y=direction.y<0?wallY+1:wallY-1
                return new dt.Vector2(
                    (y-position.y)/direction.y*direction.x+position.x,
                    y,
                )
            }
        }else if(wallY==position.y){
            if(wallX<=newPosition.x&&newPosition.x<=wallX+wallWidth)
                return new dt.Vector2(
                    direction.x<0?wallX+wallWidth+1:wallX-1,
                    wallY
                )
        }
    }else{
        if(direction.x){
            if(segmentIntersection(
                wallPosition,
                new dt.Vector2(wallX,wallY+wallHeight),
                position,
                newPosition,
            )){
                let x=direction.x<0?wallX+1:wallX-1
                return new dt.Vector2(
                    x,
                    (x-position.x)/direction.x*direction.y+position.y,
                )
            }
        }else if(wallX==position.x){
            if(wallY<=newPosition.y&&newPosition.y<=wallY+wallHeight)
                return new dt.Vector2(
                    wallX,
                    direction.y<0?wallY+wallHeight+1:wallY-1
                )
        }
    }
}
function positionTo(t){
    if(!+this._status.direction)
        return
    let step=(t-this._status.time)*speed/+this._status.direction
    let displacement=this._status.direction.newMulN(
        step
    )
    let ans
    {
        let ans0=dt.NumberPair.numeric(
            [displacement],
            a=>a<0?Math.ceil(a):Math.floor(a)
        )
        ans=[
            Math.abs(ans0.x)+Math.abs(ans0.y),
            this._status.position.newAdd(ans0)
        ]
    }
    function consider(ans0){
        if(!ans0)
            return
        let ans1=ans0.newSub(this._status.position)
        ans1=Math.abs(ans1.x)+Math.abs(ans1.y)
        if(ans1<ans[0])
            ans=[ans1,ans0]
    }
    for(let i=0;i<(this._width-1)*this._height;i++)
        if(this._status.maze[i]){
            let x=i%(this._width-1),y=~~(i/(this._width-1))
            consider.call(this,move(
                (this._blockSize+1)*(x+1)*1e3+500,
                (this._blockSize+1)*y*1e3+500,
                0,
                (this._blockSize+1)*1e3,
                this._status.position,
                this._status.direction,
                displacement,
            ))
        }
    for(let i=0;i<this._width*(this._height-1);i++)
        if(this._status.maze[(this._width-1)*this._height+i]){
            let x=i%this._width,y=~~(i/this._width)
            consider.call(this,move(
                (this._blockSize+1)*x*1e3+500,
                (this._blockSize+1)*(y+1)*1e3+500,
                (this._blockSize+1)*1e3,
                0,
                this._status.position,
                this._status.direction,
                displacement,
            ))
        }
    consider.call(this,move(
        500,
        500,
        0,
        this._height*(this._blockSize+1)*1e3,
        this._status.position,
        this._status.direction,
        displacement,
    ))
    consider.call(this,move(
        this._width*(this._blockSize+1)*1e3+500,
        500,
        0,
        this._height*(this._blockSize+1)*1e3,
        this._status.position,
        this._status.direction,
        displacement,
    ))
    consider.call(this,move(
        500,
        500,
        this._width*(this._blockSize+1)*1e3,
        0,
        this._status.position,
        this._status.direction,
        displacement,
    ))
    consider.call(this,move(
        500,
        this._height*(this._blockSize+1)*1e3+500,
        this._width*(this._blockSize+1)*1e3,
        0,
        this._status.position,
        this._status.direction,
        displacement,
    ))
    if(!this._status.position.eq(ans[1])){
        this._drew=0
        this._status.position=ans[1]
    }
}
export default positionTo
