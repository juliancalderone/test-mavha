const moongose = require('mongoose');

const ListSchema = new moongose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const List = moongose.model('List', ListSchema);

module.exports = { List }