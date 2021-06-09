async function call(session,doc,a){
    let chatDoc=this._session.get(session)
    switch(a[0]){
        case'logOut':
            chatDoc.listenMessageList=0
            chatDoc.listenRoomList=0
        break
        case'unlistenRoomList':
            chatDoc.listenRoomList=0
        break
    }
}
export default call
