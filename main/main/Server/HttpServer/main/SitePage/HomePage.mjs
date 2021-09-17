import doe from                 'doe'
import Variable from            '../Variable.mjs'
function HomePage(out){
    this.credential=new Variable
    this._out=out
    this.node=doe.div(
        {className:'homePage'},
        doe.div(
            {className:'a'},
            n=>{
                this.credential.iff(
                    n,
                    doe.div({
                        className:'button',
                        onclick:()=>{
                            this._out('logIn')
                        }
                    },'Log In'),
                    a=>!a
                )
                this.credential.iff(
                    n,
                    doe.div({
                        className:'button item loggedInUserPageButton',
                        onclick:()=>{
                            this._out('loggedInUserPage')
                        },
                    },n=>{
                        this.credential.for(to=>{
                            if(to)
                                n.textContent=to[0]
                        })
                    })
                )
            },
        ),
        doe.div(
            {className:'b'},
            doe.div(
                {className:'b'},
                'This is An-Li Ting\'s personal website.'
            ),
            doe.div(
                {className:'b'},
                doe.div({className:'button',onclick:()=>{
                    this._out('maze')
                }},'Maze'),
                ' ',
                doe.div({className:'button',onclick:()=>{
                    this._out('idleKingdom')
                }},'Idle Kingdom'),
            ),
            doe.div(
                {className:'b'},
                doe.ul(
                    doe.li(doe.a({
                        href:'https://althea.anliting.com/'
                    },'My blog')),
                    doe.li(doe.a({
                        href:'https://stopwatch.anliting.com/'
                    },'Stopwatch')),
                )
            ),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(3/4)))
    })
}
HomePage.style=`
    body>.homePage{
        display:inline-block;
        padding:1em;
        width:22em;
        height:16em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.homePage>.a{
        padding-left:1em;
        text-align:right;
        height:1.75em;
    }
    body>.homePage>.a>.loggedInUserPageButton{
        min-width:2em;
    }
    body>.homePage>.b{
        margin-top:1em;
    }
    body>.homePage>.b>*+*{
        margin-top:1em;
    }
`
export default HomePage
