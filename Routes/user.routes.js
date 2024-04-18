const router = require('express').Router()

const userController = require('../controllers/usercontroller')
const auth_middleware = require('../Middleware/auth_middleware')



router.post('/register',userController.createUser)

router.get('/all',auth_middleware,userController.allUsers)

router.get('/:username',userController.usernameUser)

module.exports = router;