import doe from                 'doe'
import Variable from            '../../../Variable.mjs'
import HomePage from            './RoomPage/HomePage.mjs'
import MemberPage from          './RoomPage/MemberPage.mjs'
function RoomPage(out){
    this.messageList=new Variable([])
    this._out=out
    this._homePage=new HomePage(a=>{
        switch(a[0]){
            case'member':
                this.page.value=this._memberPage
            break
            default:
                this._out(a)
            break
        }
    })
    this._homePage.messageList.bind(this.messageList)
    this._memberPage=new MemberPage(a=>{
        switch(a[0]){
            case'back':
                this.page.value=this._homePage
            break
            default:
                this._out(a)
            break
        }
    })
    this.page=new Variable(this._homePage)
}
RoomPage.prototype.clear=function(){
    this.messageList.value=[]
    this.page.value=this._homePage
    this._homePage.clear()
    this._memberPage.clear()
}
RoomPage.style=HomePage.style+MemberPage.style
export default RoomPage
