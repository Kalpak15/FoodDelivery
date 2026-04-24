const express = require('express')

const router = express.Router()

const {getMenuController, postMenuItems,deleteMenuItems,singleMenuItem,updateMenuItem} = require('../controllers/menuController')

router.get('/', getMenuController)

router.post('/',postMenuItems)

router.delete('/:id',deleteMenuItems)

router.get('/:id',singleMenuItem)

router.patch('/:id',updateMenuItem)

module.exports = router