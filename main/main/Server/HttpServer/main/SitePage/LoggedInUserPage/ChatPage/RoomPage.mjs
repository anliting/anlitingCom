import doe from                 'doe'
import{Stream}from              'dt'
import Variable from            '../../../Variable.mjs'
import HomePage from            './RoomPage/HomePage.mjs'
import MemberPage from          './RoomPage/MemberPage.mjs'
function RoomPage(){
    this.messageList=new Variable([])
    this.out=new Stream
    this._homePage=new HomePage
    this._memberPage=new MemberPage
    this._homePage.messageList.bind(this.messageList)
    this._homePage.out.out(a=>{
        switch(a[0]){
            case'member':
                this.page.value=this._memberPage
            break
            default:
                this.out.in(a)
            break
        }
    })
    this._memberPage.out.out(a=>{
        switch(a[0]){
            case'back':
                this.page.value=this._homePage
            break
            default:
                this.out.in(a)
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
