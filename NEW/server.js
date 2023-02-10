"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const date = require(__dirname + '/date.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const tasks = new Set();
dotenv.config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const port = process.env.PORT;
const password = process.env.PASSWORD;
const mongodb_url = `mongodb+srv://Nat:${password}@cluster0.qxgtgun.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongodb_url);
const todoSchema = new mongoose_1.Schema({
    task: String,
    isDone: Boolean,
    taskTitle: String,
    date: { type: Date, default: Date.now }
});
const Todo = mongoose.model('Todo', todoSchema);
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
const today = date.getDate();
//const todoHome = new Set()
const todoSchool = new Set();
console.log(today);
app.get('/', (request, response) => {
    Todo.find({ taskTitle: 'Home' }, (err, todoHome) => {
        if (err)
            response.send(err);
        else
            response.render('index', { tasks: todoHome, today: today, taskTitle: 'Home' });
    });
});
app.get('/school', (request, response) => {
    Todo.find({ taskTitle: 'School' }, (err, todoHome) => {
        if (err)
            response.send(err);
        else
            response.render('index', { tasks: todoHome, today: today, taskTitle: 'School' });
    });
});
app.post('/', (request, response) => {
    let path = '/';
    const taskType = request.body.type;
    const newTask = request.body.newTask;
    if (request.body.type === 'School') {
        path = 'school';
    }
    if (request.body.isDone != '' && newTask === '' && request.body.delete === undefined) {
        const update_id = request.body.isDone;
        Todo.findOneAndUpdate({ _id: update_id }, [{ $set: { isDone: { $not: "$isDone" } } }], () => {
            response.redirect(path);
        });
    }
    if (newTask !== '') {
        const task = new Todo({
            task: newTask,
            isDone: false,
            taskTitle: taskType
        });
        task.save();
        response.redirect(path);
    }
    if (request.body.delete !== undefined) {
        const delete_id = request.body.delete;
        Todo.findByIdAndDelete(delete_id, (err) => {
            if (err) {
                response.send(err);
            }
            else {
                response.redirect(path);
            }
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map