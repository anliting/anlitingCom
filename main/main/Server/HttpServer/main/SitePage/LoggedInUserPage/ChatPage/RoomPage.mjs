import doe from                 'doe'
import Stream from              '../../../Stream.mjs'
import Variable from            '../../../Variable.mjs'
import HomePage from            './RoomPage/HomePage.mjs'
import MemberPage from          './RoomPage/MemberPage.mjs'
function RoomPage(){
    this.messageList=new Variable([])
    this.out=new Stream
    let homePage=new HomePage,memberPage=new MemberPage
    homePage.messageList.bind(this.messageList)
    homePage.out.out(a=>{
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
                this.page.value=homePage
            break
            default:
                this.out.in(a)
            break
        }
    })
    this.page=new Variable(homePage)
}
RoomPage.style=HomePage.style+MemberPage.style
export default RoomPage
