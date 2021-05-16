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
export default Stream
