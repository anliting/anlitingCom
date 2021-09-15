import IdleKingdomPage from     './IdleKingdomPage.mjs'
function loadIdleKingdomPage(){
    if(this._idleKingdomPage)
        return
    this._idleKingdomPage=new IdleKingdomPage
    this._idleKingdomPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this._offPage()
                this.page.value=this._homePage
            break
        }
    })
}
export default loadIdleKingdomPage
