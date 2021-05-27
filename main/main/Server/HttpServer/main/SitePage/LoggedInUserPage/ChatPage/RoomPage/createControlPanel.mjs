import doe from                 'doe'
function createControlPanel(){
    return doe.div(
        {className:'controlPanel'},
        doe.div(
            doe.div(
                {className:'a'},
                doe.div('Back',{
                    className:'button',
                    onclick:()=>{
                        this.out.in(['back'])
                    },
                }),
            ),
            doe.div(
                {className:'b'},
                doe.div('Invite',{
                    className:'button disabled',
                    onclick:()=>{
                    },
                }),
                ' ',
                doe.div('Leave',{
                    className:'button disabled',
                    onclick:()=>{
                        this.out.in(['leave'])
                    },
                },n=>{doe(n.style,{
                    color:'#ff7f7f',
                })}),
            ),
        ),
    )
}
export default createControlPanel
