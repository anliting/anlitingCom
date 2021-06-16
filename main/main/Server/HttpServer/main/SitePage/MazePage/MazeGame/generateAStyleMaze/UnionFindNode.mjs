function UnionFindNode(){
    this.parent=this
}
UnionFindNode.prototype.find=function(){
    if(this.parent==this)
        return this
    return this.parent=this.parent.find()
}
UnionFindNode.prototype.union=function(n){
    n.find().parent=this.find()
}
export default UnionFindNode
