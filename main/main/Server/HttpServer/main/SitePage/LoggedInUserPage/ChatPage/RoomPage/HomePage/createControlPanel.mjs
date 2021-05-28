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
                doe.div('Member',{
                    className:'button',
                    onclick:()=>{
                        this.out.in(['member'])
                    },
                }),
            ),
        ),
    )
}
export default createControlPanel
