function Stream(){
    this._a=[]
}
Stream.prototype.in=function(a){
    if(this._out)
        this._out(a)
    else
        this._a.push(a)
    return this
}
Stream.prototype.out=function(f){
    if(f){
        this._a.map(f)
        this._a=[]
    }
    this._out=f
    return this
}
Stream.prototype.to=function(s){
    this.out(this.in.bind(s))
}
function StreamCaller(stream){
    this._stream=stream
}
StreamCaller.prototype=new Proxy({},{get(t,p){
    return function(){
        return new Promise(rs=>
            this._stream.in([p,...arguments,rs])
        )
    }
}})
Stream.StreamCaller=StreamCaller
export default Stream
