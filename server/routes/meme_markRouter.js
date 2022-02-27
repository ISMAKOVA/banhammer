const Router = require('express')
const router = new Router()
const meme_markController = require('../controllers/meme_markController')

router.post('/', meme_markController.create)
router.get('/', meme_markController.getAll)
router.get('/:id', meme_markController.getOne)
router.delete('/', meme_markController.delete)

module.exports = router