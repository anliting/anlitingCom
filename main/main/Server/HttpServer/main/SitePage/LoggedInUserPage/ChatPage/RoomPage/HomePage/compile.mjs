import uri from            'uri'
import doe from            'doe'
function*renderUrl(s){
    for(let m;m=uri.matchAbsoluteUri(s);){
        yield document.createTextNode(s.substring(0,m.index))
        yield /^https?/.test(m[0])?
            doe.a(decodeURI(m[0]),{href:m[0]})
        :
            document.createTextNode(m[0])
        s=s.substring(m.index+m[0].length)
    }
    yield document.createTextNode(s)
}
function compile(s){
    return renderUrl(s)
}
export default compile
