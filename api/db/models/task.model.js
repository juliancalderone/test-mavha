const moongose = require('mongoose');

const TaskSchema = new moongose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    _listId: {
        type: moongose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = moongose.model('Task', TaskSchema);

module.exports = {
    Task
}