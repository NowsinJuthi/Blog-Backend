const express = require('express')
const router = express.Router()

router.post('/registration',register)
router.get('/login', login)