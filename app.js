const express = require('express')
const session = require('express-session')
const gu = require(__dirname + '/scripts/geren_users.js')
const subpost = require(__dirname + '/scripts/submitpost.js')


app = express()


app.use(session({secret: 'jfiejdiowajdpoawdkopfjae'}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    if(gu.validaUser(req.body.login, req.body.senha)){
        req.session.login = req.body.login;
        res.redirect('/')
    }else{
        res.render('login')
    }
})

app.get('/', (req,res)=>{
    if(req.session.login){
        if(req.query.page){
            res.render('principal', {user: gu.acessaUser(req.session.login), posts: subpost.acessarPosts(), page: req.query.page})
        }else{
            res.render('principal', {user: gu.acessaUser(req.session.login), posts: subpost.acessarPosts(), page: 1})
        }
    }else{
        res.redirect('/login')
    }
})

app.post('/', (req,res)=>{
    if(req.body.anon && req.body.post != ''){
        subpost.adicionaPost("Anonymou", req.body.post)
    }else if(req.body.post != ''){
        subpost.adicionaPost(req.session.login, req.body.post)
    }
    res.redirect('/')
})


app.get('/register', (req,res)=>{
    res.render('register')
})

app.post('/register', (req,res)=>{
    let params = req.body;
    if(params.password == params.password_confirm){
        gu.cadastraUser(params.username, params.desc, params.email, params.password)
        res.render('login')
    }
})


app.listen(3000, ()=>{console.log("---Servidor iniciado na porta 3000---")})
