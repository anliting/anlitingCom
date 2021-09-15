import link from            './link.mjs'
import minify from          './minify.mjs'
import htmlMinifier from    'html-minifier'
async function calcRootContent(mainDir,wsEndListen){
    let main=(async()=>minify(`globalThis.anlitingCom=${
        JSON.stringify(wsEndListen)
    };${
        await link(`${mainDir}/main/Server/HttpServer/main.mjs`,{
            doe:`${mainDir}/../lib/doe/export/main.mjs`,
            dt:`${mainDir}/../lib/dt/export/main.mjs`,
            uri:`${mainDir}/../lib/uri/export/main.mjs`,
        })
    }`))()
    return htmlMinifier.minify(`
        <!doctype html>
        <meta name=viewport content='initial-scale=1,width=device-width'>
        <link rel=icon href=data:,>
        <title>anliting.com</title>
        <body>
        <script type=module>${await main}</script>
    `,{
        collapseWhitespace:true,
        removeAttributeQuotes:true,
        removeOptionalTags:true,
    })
}
export default calcRootContent
