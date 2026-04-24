const  express  =  require("express")
const verifyToken = require("../middleware/verifyToken")
const verifyAdmin = require("../middleware/verifyAdmin")

const router =express.Router()

const {getallUsers,createUser,deleteUser,getAdmin,makeAdmin} = require('../controllers/userController')

router.get('/', verifyToken,verifyAdmin, getallUsers)
router.post('/',createUser)
router.delete('/:id', verifyToken,verifyAdmin, deleteUser)
router.get('/admin/:email', verifyToken , getAdmin)
router.patch('/admin/:id',verifyToken,verifyAdmin,makeAdmin)
module.exports = router