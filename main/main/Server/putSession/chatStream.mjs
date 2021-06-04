import process from 'process'
function chatStream(session,a){
    let doc=this._session.get(session)
    switch(a[0]){
        case'invite':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                let b=this._chat.room.array.filter(b=>
                    b.id==a[1]&&b.user.includes(doc.user)
                )
                if(!b.length)
                    return
                b=b[0]
                let s=new Set(b.user)
                s.add(a[2])
                b.user=[...s.keys()]
                await this._database.chat.setRoomList(this._chat.room)
                a[3]()
                for(let doc of this._session.values())
                    if(doc.listenRoomList)
                        doc.listenRoomList(
                            this._chat.room.array.filter(a=>
                                a.user.includes(doc.user)
                            )
                        )
            })()
        break
        case'leave':
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                let b=this._chat.room.array.filter(b=>
                    b.id==a[1]&&b.user.includes(doc.user)
                )
                if(!b.length)
                    return
                b=b[0]
                let s=new Set(b.user)
                s.delete(doc.user)
                b.user=[...s.keys()]
                await this._database.chat.setRoomList(this._chat.room)
                a[2]()
                for(let doc of this._session.values())
                    if(doc.listenRoomList)
                        doc.listenRoomList(
                            this._chat.room.array.filter(a=>
                                a.user.includes(doc.user)
                            )
                        )
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
