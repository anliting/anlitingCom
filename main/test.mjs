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
        let room=await database.getRoom()
        console.log(+(room.index==0&&room.array.length==0),'database.chat')
        let id=await database.putRoom(0)
        console.log(+(id==0),'database.chat')
        room=await database.getRoom()
        console.log(+(
            room.index==1&&
            room.array.length==1&&
            room.array[0].id==0&&
            room.array[0].user.length==1&&
            room.array[0].user[0]==0
        ),'database.chat')
        let message=await database.getRoomMessage(0)
        console.log(+(message.length==0),'database.chat')
    }
    await database.end()
})()
