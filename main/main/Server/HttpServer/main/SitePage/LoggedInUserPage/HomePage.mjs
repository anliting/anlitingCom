import doe from                 'doe'
import Variable from            '../../Variable.mjs'
function HomePage(out){
    this._out=out
    this.node=doe.div(
        {className:'loggedInUserPage'},
        doe.div(
            doe.div('Back',{
                className:'button',
                onclick:()=>{
                    this._out(['back'])
                }
            }),
        ),
        doe.div(
            {className:'a'},
            doe.div(
                doe.div('Edit Profile',{
                    className:'button',
                    onclick:()=>{
                        this._out(['editProfile'])
                    },
                }),
                ' ',
                doe.div('Change Password',{
                    className:'button',
                    onclick:()=>{
                        this._out(['changePassword'])
                    },
                }),
            ),
            doe.div(
                doe.div('Delete Current User',{
                    className:'button',
                    onclick:()=>{
                        if(
                            confirm('Are you sure to delete this user?')
                        )
                            this._out(['cutCurrentUser'])
                    },
                }),
                ' ',
                doe.div('Log Out',{
                    className:'button',
                    onclick:()=>{
                        this._out(['logOut'])
                    }
                }),
            ),
        ),
        doe.div(
            doe.div('Chat',{
                className:'button',
                onclick:()=>{
                    this._out(['chat'])
                },
            }),
            ' ',
            doe.div('Deep World',{
                className:'button',
                onclick:()=>{
                    this._out(['deepWorld'])
                },
            }),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
export default HomePage
