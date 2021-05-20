import Database from'./main/Server/Database.mjs'
;(async()=>{
    let database=new Database
    {
        let id=await database.putUser('password')
        console.log(+(id==0),'database.user')
        console.log(
            +!await database.testCredential(id,Buffer.from('test')),
            'database.user'
        )
        await database.setPassword(id,Buffer.from('test'))
        console.log(
            +!!await database.testCredential(id,Buffer.from('test')),
            'database.user'
        )
    }{
        let room=await database.chat.getRoom()
        console.log(
            +(room.index==0&&room.array.length==0),
            'database.chat.getRoom'
        )
        let id=await database.chat.putRoom(0)
        console.log(+(id==0),'database.chat.putRoom 0')
        room=await database.chat.getRoom()
        console.log(+(
            room.index==1&&
            room.array.length==1&&
            room.array[0].id==0&&
            room.array[0].user.length==1&&
            room.array[0].user[0]==0
        ),'database.chat.putRoom 1')
        let message=await database.chat.getRoomMessage(0)
        console.log(+(message.length==0),'database.chat.getRoomMessage')
        await database.chat.putRoomMessage(0,0,'hello, world')
        message=await database.chat.getRoomMessage(0)
        console.log(+(message.length==1),'database.chat.putRoomMessage')
    }
    await database.end()
})()
