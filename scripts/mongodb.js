const mongoose = require('mongoose');

exports.mong = function(){
    mongoose.connect('mongodb://root:toor@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    return db = mongoose.connection
}
