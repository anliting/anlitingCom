import doe from             'doe'
function _react(rule){
    if(rule.type=='iff'){
        let v=rule.expression(this.map)
        if(!rule.status&&v)
            doe(rule.parent,0,rule.child)
        if(rule.status&&!v)
            doe(rule.parent,1,rule.child)
        rule.status=v
    }
    if(rule.type=='for')
        rule.function(this.map)
}
function StatusHolder(){
    this._rule=[]
    this.map=new Proxy({},{set:(o,k,v)=>{
        o[k]=v
        this._rule.map(_react.bind(this))
        return true
    }})
}
StatusHolder.prototype.for=function(f){
    let rule={type:'for',function:f}
    this._rule.push(rule)
    _react.call(this,rule)
}
StatusHolder.prototype.iff=function(expression,parent,child){
    let rule={type:'iff',parent,child,expression,status:0}
    this._rule.push(rule)
    _react.call(this,rule)
}
export default StatusHolder
