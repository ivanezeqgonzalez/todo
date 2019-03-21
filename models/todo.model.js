import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/todo');

const TodoSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    description: String
})

module.exports = mongoose.model('Todo', TodoSchema)