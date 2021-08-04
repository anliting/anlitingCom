export default{
    factory:[
        {name:'獵人'},
        {name:'農民'},
        {name:'礦工'},
        {name:'織布工'},
        {name:'步兵'},
        {name:'弓箭手'},
        {name:'騎士'},
        {name:'弓騎兵'},
        {name:'牧師'},
    ],
    speed:i=>.1*10**i,
    price:(i,j)=>Math.floor(8*8**i*1.2**j),
}
