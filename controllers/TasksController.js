const { Task } = require('../models/Task')
const tasksCtrl = {
    getTasks: async (req, res) => {
        try {
            const ownerId = req.user.id
            const tasks = await Task.find({ owner: ownerId })
            res.status(200).json({ success: true, msg: 'tasks found', tasks })
        } catch (error) {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    },
    addTask: async (req, res) => {
        try {
            const { taskTitle, taskDescription } = req.body
            const taskOwner = req.user.id
            const task = new Task({
                title: taskTitle,
                description: taskDescription,
                owner: taskOwner
            })
            await task.save()
            res.status(200).json({ success: true, msg: 'Task Added', task })
        } catch (error) {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    },
    editTask: async (req, res) => {
        try {
            const id = req.params.id
            const { title, description } = req.body
            await Task.findByIdAndUpdate(id, {
                title, description
            })
            res.status(200).json({ succes: true, msg: 'Task updated' })

        } catch (error) {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    },
    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.id
            await Task.findByIdAndRemove(taskId)
            res.status(200).json({ succes: true, msg: 'Task Deleted' })
        } catch (error) {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    },
    finished: async (req, res) => {
        try {
            const taskId = req.params.id
            const task = await Task.findById(taskId)
            const Finished = task.finished
            await Task.findByIdAndUpdate(taskId, { finished: !Finished })
            res.status(200).json({ succes: true, msg: 'Task status changed' })
        } catch (error) {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    }
}
module.exports = tasksCtrl