const express = require('express');
const app = express();

const {moongose} = require('./db/moongose');

const bodyParser = require('body-parser');

// models
const { List, Task } = require('./db/models');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// get all list 
app.get('/lists', (req, res)=> {
    List.find({}).then((lists)=> {
        res.send(lists);
    });
});

// create a new list
app.post('/lists', (req, res)=> {
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=> {
        res.send(listDoc);
    })

});

// update list by id
app.patch('/lists/:id', (req, res)=> {
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(()=> {
        res.sendStatus(200);
    })
});

// delete list 
app.delete('/lists/:id', (req, res)=> {
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDoc)=> {
        res.send(removedListDoc);
    });
});

// tasks by list-id

app.get('/lists/:listId/tasks', (req,res)=> {
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=> {
        res.send(tasks);
    })
});

app.post('/lists/:listId/tasks', (req,res)=> {
    let newTask = new Task ({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc)=> {
        res.send(newTaskDoc);
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'update ok'});
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res)=> {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
})

app.get('/lists/:listId/tasks/:taskId', (req,res)=> {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task)=> {
        res.send(task);
    })
})


app.listen(3000, ()=> {
    console.log("server is listening");
})