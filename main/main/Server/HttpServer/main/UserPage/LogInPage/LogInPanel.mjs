import doe from         'doe'
import Stream from      '../../Stream.mjs'
function LogInPanel(){
    this.outStream=new Stream
    function submit(){
        if(this._idInput.checkValidity()){
            this.outStream.in([
                'logIn',
                +this._idInput.value,
                this._passwordInput.value
            ])
            this.clear()
            this.out.submit()
        }
    }
    this.node=doe.div(
        {
            className:'logInPanel',
            onkeydown:e=>{
                if(e.key=='Enter')
                    submit.call(this)
            },
        },
        doe.div(
            {className:'a',},
            this._idInput=doe.input({
                autocomplete:'username',
                className:'id',
                placeholder:'ID',
                pattern:'[0-9]+',
            }),
        ),
        doe.div(
            {className:'b',},
            this._passwordInput=doe.input({
                autocomplete:'current-password',
                placeholder:'Password',
                type:'password',
                onfocus:()=>{
                    this._idInput.required=true
                },
            }),
        ),
        doe.div(
            {className:'c',},
            doe.div('Log In',{className:'button',onclick:()=>{
                this._idInput.required=true
                submit.call(this)
            }}),
        ),
    )
}
LogInPanel.prototype.clear=function(){
    this._idInput.required=false
    this._idInput.value=''
    this._passwordInput.value=''
}
LogInPanel.prototype.focus=function(){
    this._idInput.focus()
}
export default LogInPanel
