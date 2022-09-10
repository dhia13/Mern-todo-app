const router = require('express').Router()
const tasksCtrl = require('../controllers/TasksController')
const { protect, Admin } = require('../utils/Authentication')
//add Task 
router.post('/', protect, tasksCtrl.addTask)
//edit Task
router.put('/:id', protect, tasksCtrl.editTask)
//delete Task 
router.delete('/:id', protect, tasksCtrl.deleteTask)
//finish task 
router.put('/finished/:id', protect, tasksCtrl.finished)
//get tasks
router.get('/', protect, tasksCtrl.getTasks)
module.exports = router