import Todo from '../models/todo.model';

class TodoController {
    getAllTodos(req, res) {
        Todo.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Todos."
            });
        })
    }

    getTodo(req, res) {
        Todo.findById(req.params.id)
        .then(data => {
            if(!data){
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retriving todo with id " + req.params.id
            })
        })     
    }

    createTodo(req, res) {
        if(!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'Title is required'
            })
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'Description is required'
            })
        }
        let todo = new Todo(req.body);
        todo.save()
        .then(data => {
            if(!data || data.lenght === 0) {
                return res.status(500).send(data)
            }
            
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    updateTodo(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'Title is required',
            })
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'Description is required',
            })
        }

        let oldTodo = Todo.findById(req.params.id);
        Todo.findByIdAndUpdate(req.params.id,{
            title: req.body.title || oldTodo.title,
            description: req.body.description || oldTodo.description
        }, {new: 'true'})
        .then(todo =>{
            if(!todo){
                return res.stauts(404).send({
                    message: 'Todo not found with id ' + req.params.id
                })
            }
            res.send(todo)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.send(404).send({
                    message: "Todo not found with id " + req.params.id
                })                
            }
            return res.status(500).send({
                message: "Error updateing todo with id " + req.params.id
            })
        })
    }

    deleteTodo(req, res) {
        Todo.findByIdAndRemove(req.params.id)
        .then(todo => {
            if(!todo) {
                return res.stauts(404).send({
                    message: "Todo not found with id " + req.params.id 
                })
            }
            res.send({message: "Todo deleted successfully"})
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.noteId
                })
            }
            return res.status(500).send({
                message: "Could not delete todo with id " + req.params.noteId
            })
        })
    }
}

const todoController = new TodoController();
export default todoController;