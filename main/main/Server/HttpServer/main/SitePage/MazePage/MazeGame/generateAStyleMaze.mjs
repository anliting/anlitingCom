import UnionFindNode from'./generateAStyleMaze/UnionFindNode.mjs'
import cppAlgorithm from'./generateAStyleMaze/cppAlgorithm.mjs'
function*generateAStyleMaze(width,height){
    let
        countOfVertices=    width*height,
        countOfEdges=       2*width*height-width-height,
        sorting=            Array(countOfEdges),
        nodes=              Array(countOfVertices)
    for(let i=0;i<countOfVertices;i++)
        nodes[i]=new UnionFindNode
    for(let i=0;i<countOfEdges;i++)
        sorting[i]=i
    sorting=[...cppAlgorithm.random_shuffle(sorting)]
    for(let e of sorting){
        let v,w
        if(e<(width-1)*height){
            v=width*~~(e/(width-1))+e%(width-1)
            w=v+1
        }else{
            let e0=e-(width-1)*height
            v=width*~~(e0/width)+e0%width
            w=v+width
        }
        if(nodes[v].find()!=nodes[w].find()){
            nodes[v].union(nodes[w])
            yield e
        }
    }
}
export default generateAStyleMaze
