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
            status.time=t
        },
        (status,a)=>{
        }
    )
}
