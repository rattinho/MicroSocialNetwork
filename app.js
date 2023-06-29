const express = require('express')
const session = require('express-session')
const gu = require(__dirname + '/scripts/geren_users.js')
const subpost = require(__dirname + '/scripts/submitpost.js')


app = express()


app.use(session({secret: 'jfiejdiowajdpoawdkopfjae'}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// Páginas de LOGIN
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



// Página Principal
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
        subpost.adicionaPost("", req.body.post, "/images/anon.png")
    }else if(req.body.post != ''){
        subpost.adicionaPost(req.session.login, req.body.post, gu.acessaUser(req.session.login).avatarimg)
    }
    res.redirect('/')
})


// Página de Registro
app.get('/register', (req,res)=>{
    res.render('register')
})

app.post('/register', (req,res)=>{
    let params = req.body;
    if(params.password == params.password_confirm){
        gu.cadastraUser(params)
        res.redirect('/login')
    }
})

//Página de Editar Usuário
app.get('/edit', (req, res)=>{
    if(req.session.login){
        res.render('edit', {user: gu.acessaUser(req.session.login)})
    }else{
        res.redirect('/login')
    }

})

app.post('/edit', (req,res)=>{
    if(req.session.login){
        if(gu.alteraUser(req.session.login,req.body.avatarimg)){
            res.redirect('/')
        }else{
            res.redirect('/edit')
        }
    }
})

app.listen(3000, ()=>{console.log("---Servidor iniciado na porta 3000---")})
