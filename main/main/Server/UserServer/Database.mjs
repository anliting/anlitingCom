import core from    '@anliting/core'
import fs from      'fs'
import Stream from  '../Stream.mjs'
function UserDatabase(ready){
    this._out=(this.out=new Stream).caller
    this._ready=(async()=>{
        await ready
        if(await core.existFile('data/user'))
            return
        await this._out.update([
            [1,'data/user'],
            [
                0,
                'data/user/main',
                JSON.stringify({
                    index:0,
                })
            ],
            [1,'data/user/user'],
        ])
    })()
}
export default UserDatabase
