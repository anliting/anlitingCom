import doe from                 'doe'
import{Stream}from              'dt'
import Variable from            '../../Variable.mjs'
import HomePage from            './ChatPage/HomePage.mjs'
import RoomPage from            './ChatPage/RoomPage.mjs'
function ChatPage(){
    let currentRoom
    let homePage=new HomePage,roomPage=new RoomPage
    this.page=new Variable(homePage)
    this.out=new Stream
    homePage.out.out(a=>{
        if(a[0]=='room'){
            roomPage.clear()
            this.page.bind(roomPage.page)
            roomPage.page.value.scrollToBottom()
            this._messageListListener=messageList=>
                roomPage.messageList.value=messageList
            currentRoom=a[1]
            this.out.in([
                'listenMessageList',a[1],this._messageListListener
            ])
        }else
            this.out.in(a)
    })
    roomPage.out.out(a=>{
        if(a[0]=='back'){
            this.page.value=homePage
            this.out.in([
                'unlistenMessageList',this._messageListListener
            ])
        }else if(a[0]=='putMessage'){
            this.out.in(['putMessage',currentRoom,a[1],a[2]])
        }else if(a[0]=='leave')
            this.out.in(['leave',currentRoom,()=>{}])
        else if(a[0]=='invite')
            this.out.in(['invite',currentRoom,a[1],()=>{}])
    })
    this.out.in(['listenRoomList',roomList=>{
        homePage.roomList.value=roomList
        if(!(
            this.page.value!=roomPage.page.value||
            roomList.some(a=>a.id==currentRoom)
        ))
            this.page.value=homePage
    }])
}
ChatPage.style=HomePage.style+RoomPage.style
export default ChatPage
