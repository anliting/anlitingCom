function putSession(session){
    let doc={}
    this._session.set(session,doc)
    session.out={
        getOwn:()=>{
            return doc.ready=(async()=>{
                await doc.ready
                if(doc.user==undefined)
                    return never
                return this._database.getOwn(doc.user)
            })()
        },
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
                    doc.user=undefined
                    session.logOut()
                }
            })()
        },
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
                    return never
                await this._database.setOwn(doc.user,buffer)
            })()
        ,
    }
}
export default putSession
