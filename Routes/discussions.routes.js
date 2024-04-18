const router = require('express').Router()

const discussionsController = require('../controllers/discussionscontroller')
const auth_middleware = require('../Middleware/auth_middleware')



router.post('/new',discussionsController.createDiscussion)

router.get('/all',auth_middleware,discussionsController.allDiscussions)

router.get('/user/:username',discussionsController.usernameDiscussion)
router.get('/id/:id',discussionsController.discussionWithId)
router.delete('/id/:id',discussionsController.deleteDiscussion)
router.patch('/id/:id',discussionsController.updateDiscussion)
router.put('/:id/comment',discussionsController.updateComments)

module.exports = router;