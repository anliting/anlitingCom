import dt from                  'dt'
import positionTo from          './animationFrame/positionTo.mjs'
import draw from                './animationFrame/draw.mjs'
export default function(t){
    while(
        this._queue.length
    ){
        let a=this._queue.shift()
        a[0]=Math.max(this._status.time,a[0])
        positionTo.call(this,a[0])
        if({
            'ArrowLeft':1,
            'ArrowRight':1,
            'ArrowUp':1,
            'ArrowDown':1,
        }[a[2]]){
            if(a[1]=='keyDown')
                this._status.key[a[2]]=1
            if(a[1]=='keyUp')
                this._status.key[a[2]]=0
            this._status.direction=new dt.Vector2(
                    (this._status.key.ArrowLeft?-1:0)+
                    (this._status.key.ArrowRight?1:0)
                ,
                    (this._status.key.ArrowUp?-1:0)+
                    (this._status.key.ArrowDown?1:0)
            )
        }
        this._status.time=a[0]
    }
    t=Math.max(this._status.time,Math.floor(1e3*t)-this._startTime)
    positionTo.call(this,t)
    this._status.time=t
    draw.call(this,this._status)
}
