import doe from                 'doe'
import{Stream}from              'dt'
import Variable from            '../../Variable.mjs'
function DeepWorldPage(){
    this.out=new Stream
    this.node=doe.div(
        {className:'deepWorldPage'},
        doe.div(
            {className:'a'},
            doe.div(
                {className:'a'},
                doe.div('Back',{
                    className:'button',
                    onclick:()=>{
                        this.out.in(['back'])
                    }
                }),
            ),
            doe.div(
                {className:'b'},
                doe.div('New Character',{
                    className:'button',
                    onclick:()=>{
                    }
                }),
            ),
        ),
    )
    this.size=new Variable([1,1]).for(a=>{
        this.node.style.setProperty('--zoom',''+Math.min(a[0],a[1]/(9/16)))
    })
}
DeepWorldPage.style=`
    body>.deepWorldPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:22em;
        height:11.5em;
        font-size:calc(var(--zoom) * 1 / 24 * 1px);
        text-shadow:
            0 0 .0625em rgba(0,0,0,.4),
            .0625em .0625em .0625em rgba(0,0,0,.2);
        vertical-align:middle;
    }
    body>.deepWorldPage>.a{
        display:table;
        width:100%;
    }
    body>.deepWorldPage>.a>*{
        display:table-cell;
    }
    body>.deepWorldPage>.a>.a{
        text-align:left;
    }
    body>.deepWorldPage>.a>.b{
        text-align:right;
    }
`
export default DeepWorldPage
