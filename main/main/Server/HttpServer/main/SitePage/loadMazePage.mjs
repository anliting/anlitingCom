import MazePage from            './MazePage.mjs'
function loadMazePage(){
    if(this._mazePage)
        return
    this._mazePage=new MazePage
    this._mazePage.out.out(a=>{
        switch(a[0]){
            case'back':
                this._popPage()
                this.page.value=this._homePage
            break
        }
    })
}
export default loadMazePage