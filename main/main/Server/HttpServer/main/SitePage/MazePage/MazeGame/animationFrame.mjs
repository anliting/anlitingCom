import dt from                  'dt'
import positionTo from          './animationFrame/positionTo.mjs'
import draw from                './animationFrame/draw.mjs'
function push(status,t){
    positionTo.call(this,status,t)
    status.time=t
}
function pushWithEvent(status,queue,t){
    while(queue.length&&queue[0][0]<t){
        let a=queue.shift()
        push.call(this,status,Math.max(status.time,a[0]))
        if({
            'ArrowLeft':1,
            'ArrowRight':1,
            'ArrowUp':1,
            'ArrowDown':1,
        }[a[2]]){
            if(a[1]=='keyDown')
                status.key[a[2]]=1
            if(a[1]=='keyUp')
                status.key[a[2]]=0
            status.direction=new dt.Vector2(
                    (status.key.ArrowLeft?-1:0)+
                    (status.key.ArrowRight?1:0)
                ,
                    (status.key.ArrowUp?-1:0)+
                    (status.key.ArrowDown?1:0)
            )
        }
    }
    push.call(this,status,t)
}
export default function(t){
    pushWithEvent.call(
        this,this._status,this._queue,Math.floor(1e3*t)-this._startTime
    )
    draw.call(this,this._status)
}
