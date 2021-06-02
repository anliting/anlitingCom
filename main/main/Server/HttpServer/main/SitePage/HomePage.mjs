import doe from                 'doe'
import Variable from            '../Variable.mjs'
import Stream from              '../Stream.mjs'
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
                'You might also want to visit ',
                doe.a({href:'https://althea.anliting.com/'},'my blog'),
                '.'
            ),
            doe.div(
                {className:'b'},
                'Here are some services this website provides:',
                doe.ul(
                    doe.li(doe.a({
                        href:'https://stopwatch.anliting.com/'
                    },'Stopwatch'))
                )
            ),
        ),
    )
    this.size=new Variable([1,1]).for(a=>
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(16/22)))
    )
}
export default HomePage
