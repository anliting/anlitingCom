function pushRoomList(){
    for(let doc of this._session.values())
        if(doc.listenRoomList)
            doc.listenRoomList[1](
                this.room.array.filter(a=>
                    a.user.includes(doc.listenRoomList[0])
                )
            )
}
function pushMessageList(){
    for(let doc of this._session.values())
        if(doc.listenMessageList)
            doc.listenMessageList[1](
                this.roomMessage[
                    doc.listenMessageList[0]
                ]
            )
}
async function call(session,doc,a){
    let chatDoc=this._session.get(session)
    switch(a[0]){
        case'invite':
            if(!(
                doc.user!=undefined
            ))
                return
            await(this.ready=(async()=>{
                await this.ready
                await this.invite(a[1],doc.user,a[2])
                a[3]()
                pushRoomList.call(this)
            })())
        break
        case'leave':
            if(!(
                doc.user!=undefined
            ))
                return
            await(this.ready=(async()=>{
                await this.ready
                await this.leave(a[1],doc.user)
                a[2]()
                pushRoomList.call(this)
            })())
        break
        case'logOut':
            chatDoc.listenMessageList=0
            chatDoc.listenRoomList=0
        break
        case'listenMessageList':
            if(
                doc.user==undefined&&
                this.room.array.some(b=>
                    b.id==a[1]&&b.user.includes(doc.user)
                )
            )
                return
            chatDoc.listenMessageList=[a[1],a[2]]
            a[2](this.roomMessage[a[1]])
        break
        case'listenRoomList':
            if(!(
                doc.user!=undefined
            ))
                return
            chatDoc.listenRoomList=[doc.user,a[1]]
            a[1](this.room.array.filter(a=>
                a.user.includes(doc.user)
            ))
        break
        case'putMessage':
            if(!(
                doc.user!=undefined
            ))
                return
            await(this.ready=(async()=>{
                await this.ready
                await this.putMessage(a[1],doc.user,a[2])
                pushMessageList.call(this)
            })())
            a[3]()
        break
        case'putRoom':
            if(!(
                doc.user!=undefined
            ))
                return
            await(this.ready=(async()=>{
                await this.ready
                await this.putRoom(doc.user)
                pushRoomList.call(this)
            })())
            a[1]()
        break
        case'unlistenRoomList':
            chatDoc.listenRoomList=0
        break
    }
}
export default call
