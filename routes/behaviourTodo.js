const express = require('express');
const { requiredSignin, authMiddleware, adminMiddleware } = require('../controller/auth');
const { addTodo, listTodo, deleteTodo, editTodo } = require('../controller/behaviour');

const router = express.Router();

router.get('/behaviour/Todos/:behaviour', requiredSignin, authMiddleware, listTodo)
router.post('/behaviour/addTodo', requiredSignin, authMiddleware,adminMiddleware, addTodo)
router.delete('/behaviour/Todos/:behaviour/:todoId',  requiredSignin, authMiddleware,adminMiddleware, deleteTodo)
router.put('/behaviour/Todos/:todoId', requiredSignin, authMiddleware,adminMiddleware, editTodo)

module.exports = router