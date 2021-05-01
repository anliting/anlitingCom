import doe from                 'doe'
function Variable(value){
    this._value=value
    this._transform=[]
}
Object.defineProperty(Variable.prototype,'value',{get(){
    return this._value
},set(value){
    for(let t of this._transform)
        t(value,this._value)
    this._value=value
}})
Variable.prototype.for=function(transform){
    transform(this._value)
    this._transform.push(transform)
}
Variable.prototype.iff=function(parent,child,expression=a=>a){
    if(expression(this._value))
        doe(parent,child)
    this._transform.push((to,from)=>{
        let fromRes=expression(from),toRes=expression(to)
        if(!fromRes&&toRes)
            doe(parent,child)
        if(fromRes&&!toRes)
            doe(parent,1,child)
    })
}
Variable.prototype.transform=function(transform){
    this._transform.push(transform)
}
export default Variable
