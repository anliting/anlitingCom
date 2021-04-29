import doe from             'doe'
function UserPage(site){
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
}
export default UserPage
