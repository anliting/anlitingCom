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
}
function StatusHolder(){
    this._rule=[]
    this.map=new Proxy({},{set:(o,k,v)=>{
        o[k]=v
        this._rule.map(_react.bind(this))
        return true
    }})
}
StatusHolder.prototype.iff=function(parent,child,expression){
    let iff={type:'iff',parent,child,expression,status:0}
    this._rule.push(iff)
    _react.call(this,iff)
}
export default StatusHolder
