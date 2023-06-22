const fs = require('fs')

const nomearquivo = 'dados/users.json'

verificaUsuario = (user,email)=>{
    if(fs.existsSync(nomearquivo)){
        const conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        const users = JSON.parse(conteudoArquivo);
        for(let i = 0; i < users.length; i++){
            if(users[i].email == email || user[i].username == user){
                return false;
            }else{
                return true;
            }
        }
    }
}

exports.cadastraUser = function(user,desc,email,senha){
    const newUser = {
        username: user,
        email: email,
        descricao: desc,
        senha: senha
    }

    if(fs.existsSync(nomearquivo) && verificaUsuario(user,email)){
        const conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        const users = JSON.parse(conteudoArquivo);
        users.push(newUser)

        fs.writeFileSync(nomearquivo, JSON.stringify(users, null, 2));

    }else{
        const usuarios = [newUser];
        fs.writeFileSync(nomearquivo, JSON.stringify(usuarios, null, 2));
    }
}


exports.validaUser = function(user, pass){
    if(fs.existsSync(nomearquivo)){
        let conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        let users = JSON.parse(conteudoArquivo);
        for(let i = 0; i < users.length; i++){
            if(users[i].username == user && users[i].senha == pass){
                return true;
            }
        }
    }
    return false;
}

exports.acessaUser = function(user){
    if(fs.existsSync(nomearquivo)){
        let conteudoArquivo = fs.readFileSync(nomearquivo, 'utf-8');
        let users = JSON.parse(conteudoArquivo);
        for(let i = 0; i < users.length; i++){
            if(users[i].username == user){
                return users[i];
            }
        }
    }
}