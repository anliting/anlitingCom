import process from 'process'
function pushRoomList(){
    for(let doc of this._session.values())
        if(doc.listenRoomList)
            doc.listenRoomList(
                this._chat.room.array.filter(a=>
                    a.user.includes(doc.user)
                )
            )
}
function pushMessageList(){
    for(let doc of this._session.values())
        if(doc.listenMessageList)
            doc.listenMessageList[1](
                this._chat.roomMessage[
                    doc.listenMessageList[0]
                ]
            )
}
function chatStream(session,a){
    let doc=this._session.get(session)
    switch(a[0]){
        case'invite':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    await this._chat.invite(a[1],doc.user,a[2])
                    a[3]()
                    pushRoomList.call(this)
                })())
            })()
        break
        case'leave':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    await this._chat.leave(a[1],doc.user)
                    a[2]()
                    pushRoomList.call(this)
                })())
            })()
        break
        case'listenMessageList':
            doc.ready=(async()=>{
                await doc.ready
                if(
                    doc.user==undefined&&
                    this._chat.room.array.some(b=>
                        b.id==a[1]&&b.user.includes(doc.user)
                    )
                )
                    return
                doc.listenMessageList=[a[1],a[2]]
                a[2](this._chat.roomMessage[a[1]])
            })()
        break
        case'listenRoomList':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                doc.listenRoomList=a[1]
                a[1](this._chat.room.array.filter(a=>
                    a.user.includes(doc.user)
                ))
            })()
        break
        case'putMessage':
            doc.ready=(async()=>{
                await doc.ready
                if(!(
                    doc.user!=undefined
                ))
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    await this._chat.putMessage(a[1],doc.user,a[2])
                    pushMessageList.call(this)
                })())
                a[3]()
            })()
        break
        case'putRoom':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    await this._chat.putRoom(doc.user)
                    pushRoomList.call(this)
                })())
                a[1]()
            })()
        break
        case'unlistenRoomList':
            doc.ready=(async()=>{
                await doc.ready
                doc.listenRoomList=0
            })()
        break
    }
}
export default chatStream
