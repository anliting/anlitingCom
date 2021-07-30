import constant from './constant.mjs'
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
            status.factory.map((a,i)=>{
                status.gold+=a*constant.speed(i)*(t-status.time)/1e6
            })
            status.time=t
        },
        (status,a)=>{
            switch(a[1]){
                case'buy':
                    if(constant.price(a[2])<=status.gold){
                        status.gold-=constant.price(a[2])
                        status.factory[a[2]]++
                    }
                break
                case'sell':
                    if(status.factory[a[2]]){
                        status.factory[a[2]]--
                        status.gold+=constant.price(a[2])
                    }
                break
            }
        }
    )
    this._node.goldSpan.textContent=Math.floor(s.gold)
    s.factory.map((a,i)=>{
        this._node.factoryCount[i].textContent=a
        this._node.factoryBuy[i].classList[
            constant.price(i)<=s.gold?'remove':'add'
        ]('disabled')
        this._node.factorySell[i].classList[
            s.factory[i]?'remove':'add'
        ]('disabled')
    })
}
