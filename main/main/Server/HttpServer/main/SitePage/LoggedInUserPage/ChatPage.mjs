import doe from                 'doe'
import Stream from              '../../Stream.mjs'
import Variable from            '../../Variable.mjs'
import HomePage from            './ChatPage/HomePage.mjs'
import RoomPage from            './ChatPage/RoomPage.mjs'
function ChatPage(){
    let currentRoom
    let homepage=new HomePage,roomPage=new RoomPage
    this.page=new Variable(homepage)
    this.out=new Stream
    homepage.out.out(a=>{
        if(a[0]=='room'){
            this.page.value=roomPage
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
            this.page.value=homepage
            this.out.in([
                'unlistenMessageList',this._messageListListener
            ])
        }else if(a[0]=='putMessage'){
            this.out.in(['putMessage',currentRoom,a[1]])
        }else if(a[0]=='leave')
            ;
    })
    this.out.in(['listenRoomList',roomList=>{
        homepage.roomList.value=roomList
    }])
}
ChatPage.style=HomePage.style+RoomPage.style
export default ChatPage
