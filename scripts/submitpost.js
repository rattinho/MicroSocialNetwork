const fs = require('fs')

const nomearquivo = 'dados/posts.json'

exports.adicionaPost = (login, post, img)=>{
    const newPost = {
        username: login,
        post: post,
        avatar: img 
    }

    if(fs.existsSync(nomearquivo)){
        const conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        const posts = JSON.parse(conteudoArquivo);
        posts.unshift(newPost)

        fs.writeFileSync(nomearquivo, JSON.stringify(posts, null, 2));
    }else{
        const posts = [newPost];
        fs.writeFileSync(nomearquivo, JSON.stringify(posts, null, 2));
    }
}

exports.acessarPosts = ()=>{
    if(fs.existsSync(nomearquivo)){
        const conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        const posts = JSON.parse(conteudoArquivo);
        return posts
    }else{
        const post = [];
        fs.writeFileSync(nomearquivo, JSON.stringify(post, null, 2));
    }
}
