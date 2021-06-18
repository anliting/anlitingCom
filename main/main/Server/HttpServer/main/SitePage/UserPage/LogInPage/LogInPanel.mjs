import doe from         'doe'
import{Stream}from      'dt'
function submit(){
    this._idInput.required=true
    if(this._idInput.checkValidity()){
        let a=[
            'logIn',
            +this._idInput.value,
            this._passwordInput.value
        ]
        this.clear()
        this.out.in(a)
    }
}
function LogInPanel(){
    this._node={}
    this.out=new Stream
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
            }),
        ),
        doe.div(
            {className:'c',},
            this._node.logInButton=doe.div('Log In',{
                className:'button',
                onclick:()=>{
                    submit.call(this)
                },
            }),
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
