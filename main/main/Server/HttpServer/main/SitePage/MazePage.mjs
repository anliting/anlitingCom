import doe from                 'doe'
import Variable from            '../Variable.mjs'
import Stream from              '../Stream.mjs'
let blockWidth=8
function MazePage(){
    this.credential=new Variable
    this.out=new Stream
    this._node={}
    this.node=doe.div(
        {className:'mazePage'},
        doe.div(
            doe.div({
                className:'button',
                onclick:()=>{
                    this.out.in(['back'])
                },
            },'Back'),
        ),
        this._node.canvas=doe.canvas({
            width:11*blockWidth+1,height:11*blockWidth+1
        },n=>{
            let context=n.getContext('2d')
            context.fillStyle='#000'
            context.fillRect(0,0,11*blockWidth+1,11*blockWidth+1)
        }),
    )
    this.size=new Variable([1,1]).for(a=>{
        let zoom=Math.min(a[0],a[1]/(3/4))
        this.node.style.setProperty('--zoom',''+zoom)
        this._node.canvas.width=(14/18)*zoom
        this._node.canvas.height=(14/18)*zoom
        let context=this._node.canvas.getContext('2d')
        context.setTransform((14/18)*zoom,0,0,(14/18)*zoom,0,0)
        context.fillStyle='#000'
        //context.fillRect(0,0,11*blockWidth+1,11*blockWidth+1)
        context.fillRect(0,0,1,1)
    })
}
export default MazePage
