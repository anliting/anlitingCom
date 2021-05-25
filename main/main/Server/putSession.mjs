function putSession(session){
    let doc={}
    this._session.set(session,doc)
    session.outStream.out(a=>{
        switch(a[0]){
            case'cutCurrentUser':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user==undefined)
                        return
                    await this._database.cutUser(doc.user)
                    doc.user=undefined
                    session.logOut()
                    a[1]()
                })()
            break
            case'getOwn':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user==undefined)
                        return
                    a[1](this._database.getOwn(doc.user))
                })()
            break
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
            case'logIn':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user!=undefined){
                        doc.user=undefined
                        session.logOut()
                    }
                    if(await this._database.testCredential(a[1],a[2]))
                        doc.user=a[1]
                    else
                        session.logOut()
                })()
            break
            case'logOut':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user!=undefined){
                        doc.listenRoomList=0
                        doc.user=undefined
                        session.logOut()
                    }
                })()
            break
            case'putMessage':
                doc.ready=(async()=>{
                    await doc.ready
                    if(
                        doc.user!=undefined&&
                        this._chat.room.array.some(b=>
                            b.id==a[1]&&b.user.includes(doc.user)
                        )
                    ){
                        await this._database.chat.putRoomMessage(
                            a[1],doc.user,''+a[2]
                        )
                        this._chat.roomMessage[a[1]]=
                            await this._database.chat.getRoomMessage(a[1])
                        for(let doc of this._session.values())
                            if(doc.listenMessageList)
                                doc.listenMessageList[1](
                                    this._chat.roomMessage[
                                        doc.listenMessageList[0]
                                    ]
                                )
                    }
                })()
            break
            case'putRoom':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user!=undefined){
                        let room=await this._database.chat.putRoom(doc.user)
                        this._chat.room=await this._database.chat.getRoom()
                        this._chat.roomMessage[room]=
                            await this._database.chat.getRoomMessage(room)
                        for(let doc of this._session.values())
                            if(doc.listenRoomList)
                                doc.listenRoomList(
                                    this._chat.room.array.filter(a=>
                                        a.user.includes(doc.user)
                                    )
                                )
                    }
                })()
            break
            case'putUser':
                doc.ready=(async()=>{
                    await doc.ready
                    a[2](this._database.putUser(a[1]))
                })()
            break
            case'setOwn':
                doc.ready=(async()=>{
                    await doc.ready
                    if(doc.user==undefined)
                        return
                    await this._database.setOwn(doc.user,a[1])
                    a[2]()
                })()
            break
            case'unlistenRoomList':
                doc.ready=(async()=>{
                    await doc.ready
                })()
            break
        }
    })
}
export default putSession
