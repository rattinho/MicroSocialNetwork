const mongoose = require('mongoose');
const dbuser = process.env.BDUSER
const dbpass = process.env.BDPASS
const docker = true

if(docker){
    mongoose.connect('mongodb://'+dbuser+':'+dbpass+'@sndb:27017/socialnasah?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}else{
    mongoose.connect('mongodb://root:toor@localhost:27017/socialnasah?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: String,
    post: String,
    avatarimg: String
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

exports.setNewPost = async function(user, postage, img){
    let params = {
        username: user,
        post: postage,
        avatarimg: img
    }
    const newUser = new Post(params);
    newUser.save();
}

exports.getPosts = function(word){
    if(word == undefined){
        let posts = Post.find()
        return posts;
    }else{
        const searchRegex = new RegExp(word, 'i');
        let posts = Post.find({$or:[{post: searchRegex}, {username: searchRegex}]})
        return posts;
    }
}