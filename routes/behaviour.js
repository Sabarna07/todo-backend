const express = require('express');
const { requiredSignin, authMiddleware, adminMiddleware } = require('../controller/auth');
const { create, getAllBehaviour } = require('../controller/behaviour');

const router = express.Router();

router.get('/behaviour', getAllBehaviour)
router.post('/behaviour', requiredSignin, authMiddleware,adminMiddleware, create)

module.exports = router