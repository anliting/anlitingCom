import Database from'./start/Server/Database.mjs'
;(async()=>{
    let database=new Database
    database.putUser()
    await database.end()
})()
