const Router = require('express')
const router = new Router()
const memeController = require('../controllers/memeController')

router.post('/', memeController.create)
router.get('/', memeController.getAll)
router.get('/:id', memeController.getOne)
router.put('/', memeController.update)
router.delete('/', memeController.delete)

module.exports = router