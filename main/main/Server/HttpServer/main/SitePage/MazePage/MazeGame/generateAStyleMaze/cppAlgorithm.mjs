function*random_shuffle(a){
    a=[...a]
    for(let n=a.length;n;n--){
        let i=~~(n*Math.random())
        yield a[i]
        a[i]=a[n-1]
    }
}
export default{
    random_shuffle,
}
