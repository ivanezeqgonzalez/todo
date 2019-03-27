import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);

const TodoSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    description: String
})

module.exports = mongoose.model('Todo', TodoSchema)