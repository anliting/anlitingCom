import doe from             'doe'
import Variable from        '../../../Variable.mjs'
function HomePage(out){
    this.roomList=new Variable([])
    this._out=out
    this.node=doe.div(
        {className:'chatPage'},
        doe.div(
            {className:'controlPanel'},
            doe.div(
                doe.div(
                    {className:'a'},
                    doe.div('Back',{
                        className:'button',
                        onclick:()=>{
                            this._out(['back'])
                        },
                    }),
                ),
                doe.div(
                    {className:'b'},
                    doe.div('Create Room',{
                        className:'button',
                        onclick:()=>{
                            this._out(['putRoom',()=>{}])
                        },
                    }),
                ),
            ),
        ),
        doe.div({className:'roomList'},
            doe.div(n=>{
                this.roomList.for(a=>{
                    n.textContent=''
                    a.map(a=>
                        doe(n,
                            doe.div(
                                doe.div({
                                    className:'button item',
                                    onclick:_=>{
                                        this._out(['room',a.id])
                                    },
                                },''+a.id)
                            )
                        )
                    )
                })
            })
        )
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty(
            '--zoom',''+Math.min(a[0],a[1]/(3/4))
        )
    )
}
HomePage.style=`
    body>.chatPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.chatPage>.controlPanel>*{
        display:table;
        width:100%;
    }
    body>.chatPage>.controlPanel>*>*{
        display:table-cell;
    }
    body>.chatPage>.controlPanel>*>.a{
        text-align:left;
    }
    body>.chatPage>.controlPanel>*>.b{
        text-align:right;
    }
    body>.chatPage>.roomList{
        margin-top:1em;
        overflow-y:scroll;
        height:calc(16em - 1.75em - 1em);
    }
    body>.chatPage>.roomList>*{
        padding:.125em;
    }
    body>.chatPage>.roomList>*>*{
        text-align:center;
    }
    body>.chatPage>.roomList>*>*+*{
        margin-top:.5em;
    }
    body>.chatPage>.roomList>*>*>*{
        text-align:left;
        width:10em;
    }
`
export default HomePage
