function putSession(session){
    let doc={}
    this._session.set(session,doc)
    session.out={
        cutCurrentUser:cb=>{
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await this._database.cutUser(doc.user)
                doc.user=undefined
                session.logOut()
                cb()
            })()
        },
        getOwn:cb=>{
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                cb(this._database.getOwn(doc.user))
            })()
        },
        listenMessageList:(room,cb)=>
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                doc.listenMessageList=[room,cb]
                cb(this._chat.roomMessage[room])
            })()
        ,
        listenRoomList:cb=>
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                doc.listenRoomList=cb
                cb(this._chat.room.array.filter(a=>
                    a.user.includes(doc.user)
                ))
            })()
        ,
        logIn:(user,password)=>{
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
                    doc.user=undefined
                    session.logOut()
                }
                if(await this._database.testCredential(user,password))
                    doc.user=user
                else
                    session.logOut()
            })()
        },
        logOut:()=>{
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
                    doc.listenRoomList=0
                    doc.user=undefined
                    session.logOut()
                }
            })()
        },
        putMessage:(room,message)=>
            doc.ready=(async()=>{
                await doc.ready
                if(
                    doc.user!=undefined&&
                    this._chat.room.array.some(a=>
                        a.id==room&&a.user.includes(doc.user)
                    )
                ){
                    await this._database.chat.putRoomMessage(
                        room,doc.user,''+message
                    )
                    this._chat.roomMessage[room]=
                        await this._database.chat.getRoomMessage(room)
                    for(let doc of this._session.values())
                        if(doc.listenMessageList)
                            doc.listenMessageList[1](
                                this._chat.roomMessage[
                                    doc.listenMessageList[0]
                                ]
                            )
                }
            })()
        ,
        putRoom:()=>
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user!=undefined){
                    this._database.chat.putRoom(doc.user)
                    this._chat={
                        room:await this._database.chat.getRoom(),
                    }
                    for(let doc of this._session.values())
                        if(doc.listenRoomList)
                            doc.listenRoomList(
                                this._chat.room.array.filter(a=>
                                    a.user.includes(doc.user)
                                )
                            )
                }
            })()
        ,
        putUser:password=>
            doc.ready=(async()=>{
                await doc.ready
                return this._database.putUser(password)
            })()
        ,
        setOwn:buffer=>
            doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return
                await this._database.setOwn(doc.user,buffer)
            })()
        ,
        unlistenRoomList:()=>
            doc.ready=(async()=>{
                await doc.ready
            })()
        ,
    }
}
export default putSession
