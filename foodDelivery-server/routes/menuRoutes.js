const express = require('express')

const router = express.Router()

const {getMenuController} = require('../controllers/menuController')

router.get('/', getMenuController)

module.exports = router