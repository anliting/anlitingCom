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
        }
    })
    this.page=new Variable(homePage)
}
RoomPage.style=`
    body>.chatRoomPage{
        display:inline-block;
        margin:0 auto;
        padding:1em;
        width:20em;
        height:14em;
        font-size:calc(var(--zoom) * 1 / 22 * 1px);
        vertical-align:middle;
    }
    body>.chatRoomPage>.controlPanel>*{
        display:table;
        width:100%;
    }
    body>.chatRoomPage>.controlPanel>*>.a{
        display:table-cell;
        text-align:left;
    }
    body>.chatRoomPage>.controlPanel>*>.b{
        display:table-cell;
        text-align:right;
    }
    body>.chatRoomPage>.messageList{
        padding:.25em 0;
    }
    body>.chatRoomPage>.messageList>*{
        height:10.5em;
        overflow-y:scroll;
        overflow-anchor:none;
        word-break:break-all;
        word-wrap:break-word;
    }
    body>.chatRoomPage>.messageList>*>*{
        line-height:1.5;
        margin:.25em 0;
    }
    body>.chatRoomPage>.sendPanel>*{
        width:19em;
    }
    ${MemberPage.style}
`
export default RoomPage
