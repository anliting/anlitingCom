import doe from                 'doe'
import Variable from            '../../Variable.mjs'
import HomePage from            './ChatPage/HomePage.mjs'
import RoomPage from            './ChatPage/RoomPage.mjs'
function ChatPage(out){
    let currentRoom,homePage,roomPage
    homePage=new HomePage(a=>{
        if(a[0]=='room'){
            roomPage.clear()
            this.page.bind(roomPage.page)
            roomPage.page.value.scrollToBottom()
            this._messageListListener=messageList=>
                roomPage.messageList.value=messageList
            currentRoom=a[1]
            this._out([
                'listenMessageList',a[1],this._messageListListener
            ])
        }else
            this._out(a)
    })
    roomPage=new RoomPage(a=>{
        if(a[0]=='back'){
            this.page.value=homePage
            this._out([
                'unlistenMessageList',this._messageListListener
            ])
        }else if(a[0]=='putMessage'){
            this._out(['putMessage',currentRoom,a[1],a[2]])
        }else if(a[0]=='leave')
            this._out(['leave',currentRoom,()=>{}])
        else if(a[0]=='invite')
            this._out(['invite',currentRoom,a[1],()=>{}])
    })
    this.page=new Variable(homePage)
    this._out=out
    this._out(['listenRoomList',roomList=>{
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
