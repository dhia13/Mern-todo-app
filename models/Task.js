const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        description: {
            type: String,
            default: ''
        },
        finished: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)


const Task = mongoose.model('Task', TaskSchema)
module.exports = { Task }