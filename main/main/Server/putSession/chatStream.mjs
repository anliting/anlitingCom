import process from 'process'
function chatStream(session,a){
    let doc=this._session.get(session)
    switch(a[0]){
        case'listenMessageList':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
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
                    doc.user!=undefined&&
                    this._chat.room.array.some(b=>
                        b.id==a[1]&&b.user.includes(doc.user)
                    )
                ))
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    await this._database.chat.putRoomMessage(
                        a[1],doc.user,''+a[2]
                    )
                    this._chat.roomMessage[a[1]].push({
                        user:doc.user,
                        content:''+a[2]
                    })
                    for(let doc of this._session.values())
                        if(doc.listenMessageList)
                            doc.listenMessageList[1](
                                this._chat.roomMessage[
                                    doc.listenMessageList[0]
                                ]
                            )
                })())
            })()
        break
        case'putRoom':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await(this._chat.ready=(async()=>{
                    await this._chat.ready
                    let room=await this._database.chat.putRoom(doc.user)
                    this._chat.room.array.push({
                        id:this._chat.room.index++,
                        user:[doc.user],
                    })
                    this._chat.roomMessage[room]=[]
                    for(let doc of this._session.values())
                        if(doc.listenRoomList)
                            doc.listenRoomList(
                                this._chat.room.array.filter(a=>
                                    a.user.includes(doc.user)
                                )
                            )
                })())
            })()
        break
        case'unlistenRoomList':
            doc.ready=(async()=>{
                await doc.ready
            })()
        break
    }
}
export default chatStream
