const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

const Todo = require('./models/todo.model');

app.use(cors()); //cross-origin-resource-sharing
app.use(bodyParser.json());

//Mongodb configuration
const db = require('./config/keys').mongoURI;

//connect to database
mongoose
    .connect(db,{useNewUrlParser: true })
    .then(()=>console.log('Connected to mongodb'))
    .catch(err => console.log(err));

todoRoutes.route('/').get(function(req,res){
    Todo.find(function(err,todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req,res){
    const id = req.params.id;
    Todo.findById(id,function(err,todo){
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req,res){
    const todo = new Todo(req.body);
    todo.save()
        .then(todo=>{
            res.status(200).json({'todo':'todo added successfully'});
        })
        .catch(err=>{
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        if(!todo)
            res.status(400).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo=>{
                res.json('Todo updated');
            })
            .catch(err=>{
                res.status(400).send("Update not possible");
            });
    });  
});

app.use('/todos',todoRoutes);    

app.listen(PORT,function(){
    console.log("Server is running on Port: "+PORT);
});


