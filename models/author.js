const mongoose = require('mongoose');
const authorSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    genre : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('Author', authorSchema);