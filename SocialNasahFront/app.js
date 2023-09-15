const express = require('express')
const session = require('express-session')
const MP = require(__dirname + '/scripts/ManagePosts')
const MU = require(__dirname + '/scripts/ManageUsers')
require('dotenv').config();


app = express()


app.use(session({secret: process.env.SECRET}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// Páginas de LOGIN
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login',async (req,res)=>{
    let user = await MU.getUserData(req.body.login)
    if(user){
        if(req.body.senha == user.senha){
            req.session.login = user.username
            res.redirect('/')
        }
    }else{
        res.redirect('/login')
    }
})



// Página Principal
app.get('/', async (req,res)=>{
    if(req.session.login){
        const postsPerPage = 4;
        const pageNumber = req.query.page || 1;
        let posts
        posts = await MP.getPosts(req.query.search)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * postsPerPage)
        .limit(postsPerPage);

        res.render('principal', {user: await MU.getUserData(req.session.login), posts: posts, pageNumber: pageNumber, postsPerPage: postsPerPage})
    }else{
        res.redirect('/login')
    }
})

app.post('/', async (req,res)=>{
    if(req.body.anon && req.body.post != ''){
        await MP.setNewPost("", req.body.post, "/images/anon.png")
    }else if(req.body.post != ''){
        await MP.setNewPost(req.session.login, req.body.post, (await MU.getUserData(req.session.login)).avatarimg)
    }
    await res.redirect('/')
})


// Página de Registro
app.get('/register', (req,res)=>{
    res.render('register')
})

app.post('/register', async (req,res)=>{
    let params = req.body;
    if(params.senha == params.senha_confirm){
        await MU.setNewUser(params)
        res.redirect('/login')
    }
})

//Página de Editar Usuário
app.get('/edit', async(req, res)=>{
    if(req.session.login){
        res.render('edit', {user: await MU.getUserData(req.session.login)})
    }else{
        res.redirect('/login')
    }

})

app.post('/edit', async(req,res)=>{
    if(req.session.login && req.body.senha == req.body.senha_confirm){
        if(await MU.modUser(await MU.getUserData(req.session.login),req.body)){
            res.redirect('/')
        }else{
            res.redirect('/edit')
        }
    }
})

//Página de Membros
app.get('/members', async(req,res)=>{
    if(req.session.login){
        let userlist =  await MU.getUsers(req.query.search)
        res.render('members', {user: await MU.getUserData(req.session.login), userlist: userlist})
    }else{
        res.redirect('/login')
    }

})

app.listen(process.env.PORT, ()=>{console.log("---Servidor iniciado na porta 3000---")})
