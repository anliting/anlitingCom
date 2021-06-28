import dt from                  'dt'
let speed=64e-3
function segmentIntersection(a,b,c,d){
    function da(p,q,r){
        let pq=q.newSub(p),pr=r.newSub(p)
        return pq.x*pr.y-pq.y*pr.x
    }
    function between(p,q,r){
        let pq=q.newSub(p),pr=r.newSub(p)
        return pq.ip(pr)<=0
    }
    let d0=da(a,b,c),d1=da(a,b,d),d2=da(a,c,d),d3=da(b,c,d)
    return!d0&&between(c,a,b)||
        !d1&&between(d,a,b)||
        !d2&&between(a,c,d)||
        !d3&&between(b,c,d)||
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
    let displacement=this._status.direction.newMulN(
        (t-this._status.time)*speed
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
console.log('debug',ans[1])
    }
}
export default positionTo
