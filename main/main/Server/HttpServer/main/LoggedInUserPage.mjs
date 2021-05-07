import doe from             'doe'
import Variable from        './Variable.mjs'
function UserPage(site,out){
    this.out=out
    this.node=doe.div(
        {className:'loggedInUserPage'},
        doe.div('Back',{
            className:'button',
            onclick:()=>{
                this.out.back()
            }
        }),
        ' ',
        doe.div('Log Out',{
            className:'button',onclick:()=>{
                site.logOut()
                this.out.logOut()
            }
        }),
        ' ',
        doe.div('Delete Current User',{
            className:'button',
            onclick:()=>{
                site.cutCurrentUser()
                this.out.back()
            },
        }),
    )
    this.size=new Variable([1,1])
    this.size.for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
export default UserPage
