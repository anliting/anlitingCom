import{rollup}from'rollup'
function createPlugin(name,path){
    return{
        name,
        resolveId:i=>i==name?name:null,
        load:i=>i==name?link(path):null,
    }
}
async function link(input,plugin={}){
    let bundle=await rollup({
        input,
        plugins:Object.entries(plugin).map(e=>createPlugin(...e)),
    })
    return(await bundle.generate({format:'es'})).output[0].code
}
export default link
