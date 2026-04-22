const  express  =  require("express")
const verifyToken = require("../middleware/verifyToken")

const router =express.Router()

const {getallUsers,createUser,deleteUser,getAdmin,makeAdmin} = require('../controllers/userController')

router.get('/',verifyToken,getallUsers)
router.post('/',createUser)
router.delete('/:id',deleteUser)
router.get('/admin/:email',getAdmin)
router.patch('/admin/:id',makeAdmin)
module.exports = router