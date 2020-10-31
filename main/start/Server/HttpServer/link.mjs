import{rollup}from'rollup'
import node from'@anliting/node'
let dir=node.importMetaToDir(import.meta)
function plugin(name,path){
    return{
        name,
        resolveId:i=>i==name?name:null,
        load:i=>i==name?link(path):null,
    }
}
async function link(input){
    let bundle=await rollup({
        input,
        plugins:[
            plugin('doe',`${dir}/../../../../lib/doe/export/main.mjs`)
        ],
    })
    return(await bundle.generate({format:'es'})).output[0].code
}
export default link
