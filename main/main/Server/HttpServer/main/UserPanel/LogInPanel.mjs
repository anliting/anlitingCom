import doe from         'doe'
function LogInPanel(site){
    function submit(){
        if(this._idInput.checkValidity()){
            site.logIn(+this._idInput.value,this._passwordInput.value)
            this._idInput.required=false
            this._idInput.value=''
            this._passwordInput.value=''
        }
    }
    this.node=doe.div(
        {onkeydown:e=>{
            if(e.key=='Enter'){
                submit.call(this)
            }
        }},
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            this._idInput=doe.input({
                className:'id',
                placeholder:'ID',
                pattern:'[0-9]+',
            }),
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            this._passwordInput=doe.input({
                placeholder:'Password',
                type:'password',
                onfocus:()=>{
                    this._idInput.required=true
                },
            }),
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            doe.div('Log In',{className:'button',onclick:()=>{
                this._idInput.required=true
                submit.call(this)
            }}),
        ),
    )
}
LogInPanel.prototype.focus=function(){
    this._idInput.focus()
}
export default LogInPanel
