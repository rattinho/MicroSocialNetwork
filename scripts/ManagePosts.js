const mongoose = require('mongoose');

mongoose.connect('mongodb://root:toor@localhost:27017', {
useNewUrlParser: true,
useUnifiedTopology: true
});

db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: String,
    post: String
});

const Post = mongoose.model('Post', PostSchema);