const mongoose = require('mongoose');
const dbuser = process.env.BDUSER
const dbpass = process.env.BDPASS

mongoose.connect('mongodb://'+dbuser+':'+dbpass+'@sndb:27017/socialnasah?authSource=admin', {
useNewUrlParser: true,
useUnifiedTopology: true
});

db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    avatarimg: String,
    desc: String,
    email: String,
    senha: String,
    datanasc: Date
});

const User = mongoose.model('User', UserSchema);


exports.setNewUser = function(params){
    const newUser = new User(params);
    newUser.save();
}


exports.getUserData = async function(user){
    const users = await User.findOne({username: user});
    return users;
}

exports.modUser = async function(user, params){
    const modUsers = {
        username: user.username,
        avatarimg: params.avatarimg,
        desc: params.desc,
        email: params.email,
        senha: params.senha,
        datanasc: user.datanasc
    }
    const users = await User.findOneAndUpdate({username: user.username}, modUsers)
    return true
}