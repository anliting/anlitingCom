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
                        this._out(['back'])
                    },
                }),
            ),
            doe.div(
                {className:'b'},
                doe.div('Member',{
                    className:'button',
                    onclick:()=>{
                        this._out(['member'])
                    },
                }),
            ),
        ),
    )
}
export default createControlPanel
