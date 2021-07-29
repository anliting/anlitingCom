import doe from                 'doe'
import Variable from            '../Variable.mjs'
import{Stream}from              'dt'
function HomePage(){
    this.credential=new Variable
    this.out=new Stream
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
                            this.out.in('logIn')
                        }
                    },'Log In'),
                    a=>!a
                )
                this.credential.iff(
                    n,
                    doe.div({
                        className:'button item loggedInUserPageButton',
                        onclick:()=>{
                            this.out.in('loggedInUserPage')
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
                    this.out.in('maze')
                }},'Maze'),
                ' ',
                doe.div({className:'button',onclick:()=>{
                    this.out.in('idleKingdom')
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
export default HomePage
