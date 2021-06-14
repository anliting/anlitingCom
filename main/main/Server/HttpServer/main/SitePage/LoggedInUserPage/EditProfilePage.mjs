import doe from             'doe'
import Stream from          '../../Stream.mjs'
import Variable from        '../../Variable.mjs'
function EditProfilePage(){
    this.out=new Stream
    this.node=doe.div(
        {className:'editProfilePage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this.out.in(['back'])
                }
            }),
        ),
        doe.div(
            doe.div('Save',{
                className:'button',
                onclick:()=>{
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
export default EditProfilePage
