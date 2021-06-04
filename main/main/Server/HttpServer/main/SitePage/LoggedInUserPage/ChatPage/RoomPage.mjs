import doe from                 'doe'
import Stream from              '../../../Stream.mjs'
import Variable from            '../../../Variable.mjs'
import HomePage from            './RoomPage/HomePage.mjs'
import MemberPage from          './RoomPage/MemberPage.mjs'
function RoomPage(){
    this.messageList=new Variable([])
    this.out=new Stream
    this._homePage=new HomePage
    let memberPage=new MemberPage
    this._homePage.messageList.bind(this.messageList)
    this._homePage.out.out(a=>{
        switch(a[0]){
            case'member':
                this.page.value=memberPage
            break
            default:
                this.out.in(a)
            break
        }
    })
    memberPage.out.out(a=>{
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
    this.page.value=this._homePage
    this._homePage.clear()
}
RoomPage.style=HomePage.style+MemberPage.style
export default RoomPage
