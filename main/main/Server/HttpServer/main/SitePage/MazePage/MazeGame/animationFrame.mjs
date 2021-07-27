import dt from                  'dt'
import positionTo from          './animationFrame/positionTo.mjs'
import draw from                './animationFrame/draw.mjs'
function pushWithEvent(status,queue,t,push,event){
    while(queue.length&&queue[0][0]<t){
        let a=queue.shift()
        push(status,Math.max(status.time,a[0]))
        event(status,a)
    }
    let s=Object.assign({},status)
    push(s,t)
    return s
}
export default function(t){
    let s=pushWithEvent(
        this._status,
        this._queue,
        Math.floor(1e3*t)-this._startTime,
        (status,t)=>{
            positionTo.call(this,status,t)
            status.time=t
        },
        (status,a)=>{
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
    )
    draw.call(this,s)
}
