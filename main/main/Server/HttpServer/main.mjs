import doe from             'doe'
import Site from            './main/Site.mjs'
import UserPanel from       './main/UserPanel.mjs'
let
    site=new Site,
    userPanel=new UserPanel(site),
    currentPage,
    homePage,
    userPanelButton
site.out={
    credential(){
        userPanel.credential(site.credential)
        userPanelButton.textContent=site.credential?site.userId:'Log In'
    }
}
function setPage(page){
    doe.body(page,1,currentPage)
    currentPage=page
}
userPanel.out={
    back(){
        setPage(homePage)
    },
    logOut(){
        setPage(homePage)
    },
}
doe.head(
    doe.style(`
        html{
            height:100%;
        }
        body{
            margin:0;
            height:100%;
            background-color:#7f7f7f;
            line-height:1.2;
            color:#fff;
            text-shadow:
                0 0 .05em rgba(0,0,0,.4),
                .05em .05em .05em rgba(0,0,0,.2);
            /*overflow:hidden;*/
        }
        a{
            color:#fff;
        }
        input{
            height:1.5em;
            background-color:#bfbfbf;
            padding:.125em .5em;
            border:none;
            outline:none;
            font-size:16px;
            vertical-align:top;
        }
        .button{
            display:inline-block;
            padding:.125em .5em;
            background-color:#3f3f3f;
            color:#fff;
            text-shadow:
                0 0 .05em rgba(0,0,0,.4),
                .05em .05em .05em rgba(0,0,0,.2);
            user-select:none;
            text-align:center;
            font-family:sans-serif;
            font-size:16px;
            line-height:1.5em;
            vertical-align:top;
        }
        body>.homePage{
            margin:0 auto;
            width:540px;
        }
        .userPanel input.id:invalid{
            box-shadow:0 0 .125em .0625em red;
        }
        body>.userPanel{
            margin:0 auto;
            padding:1em;
            width:540px;
        }
        /*.userPanel{
            box-shadow:
                0 0 .1em rgba(0,0,0,.4),
                .1em .1em .1em rgba(0,0,0,.2);
            padding:.5em;
        }*/
    `)
)
doe.body(
    currentPage=homePage=doe.div(
        {className:'homePage'},
        n=>{doe(n.style,{padding:'1em'})},
        doe.div(
            n=>{doe(n.style,{textAlign:'right'})},
            userPanelButton=doe.div({className:'button',onclick:()=>{
                setPage(userPanel.node)
                userPanel.focus()
            }},'Log In'),
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'1em'})},
            'This is An-Li Ting\'s personal website.'
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'1em'})},
            'You might also want to visit ',
            doe.a({href:'https://althea.anliting.com/'},'my blog'),
            '.'
        ),
        doe.div(
            n=>{doe(n.style,{marginTop:'1em'})},
            'Here are some services this website provides:',
            doe.ul(
                doe.li(doe.a({href:'https://stopwatch.anliting.com/'},'Stopwatch'))
            )
        ),
    ),
)
navigator.serviceWorker.register('%23sw')
