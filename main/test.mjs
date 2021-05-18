import Database from'./main/Server/Database.mjs'
;(async()=>{
    let database=new Database
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
    await database.end()
})()
