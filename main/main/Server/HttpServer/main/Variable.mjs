import doe from                 'doe'
function transformValue(value){
    for(let t of this._transform)
        t(value,this._value)
    this._value=value
}
function removeBindIfExist(){
    if(this._bind){
        this._bind[0].unfor(this._bind[1])
        this._bind=0
    }
}
function Variable(value){
    this._value=value
    this._transform=new Set
}
Variable.prototype.putTransform=function(transform){
    this._transform.add(transform)
    return this
}
Variable.prototype.cutTransform=function(transform){
    this._transform.delete(transform)
    return this
}
Variable.prototype.for=function(transform){
    transform(this._value)
    this.putTransform(transform)
    return this
}
Variable.prototype.unfor=Variable.prototype.cutTransform
Variable.prototype.bind=function(v){
    removeBindIfExist.call(this)
    this._bind=[v,to=>{
        transformValue.call(this,to)
    }]
    v.for(this._bind[1])
    return this
}
Variable.prototype.setValue=function(value){
    removeBindIfExist.call(this)
    transformValue.call(this,value)
    return this
}
Object.defineProperty(Variable.prototype,'value',{get(){
    return this._value
},set(value){
    this.setValue(value)
}})
Variable.prototype.child=function(n){
    this.for((to,from)=>doe(n,1,from,0,to))
    return this
}
Variable.prototype.iff=function(parent,child,expression=a=>a){
    if(expression(this._value))
        doe(parent,child)
    this._transform.add((to,from)=>{
        let fromRes=expression(from),toRes=expression(to)
        if(!fromRes&&toRes)
            doe(parent,child)
        if(fromRes&&!toRes)
            doe(parent,1,child)
    })
    return this
}
export default Variable
