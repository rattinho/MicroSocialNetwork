const mongoose = require('mongoose');

mongoose.connect('mongodb://root:toor@localhost:27017/socialnasah?authSource=admin', {
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


exports.getUserData = function(user){
    const users = User.findOne({username: user});
    return users;
}