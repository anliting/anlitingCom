import doe from         'doe'
function LogInPanel(site,out){
    this._out=out
    function cancel(){
        this._idInput.value=''
        this._passwordInput.value=''
        this._out.back()
    }
    function submit(){
        site.logIn(+this._idInput.value,this._passwordInput.value)
        this._idInput.value=''
        this._passwordInput.value=''
    }
    this.node=doe.div(
        {onkeydown:e=>{
            if(e.key=='Enter')
                submit.call(this)
        }},
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            this._idInput=doe.input({placeholder:'ID'}),
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            this._passwordInput=doe.input({
                placeholder:'Password',
                type:'password'
            }),
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'.5em'})},
            doe.div('Log In',{className:'button',onclick:()=>{
                submit.call(this)
            }}),
        ),
    )
}
LogInPanel.prototype.focus=function(){
    this._idInput.focus()
}
export default LogInPanel
