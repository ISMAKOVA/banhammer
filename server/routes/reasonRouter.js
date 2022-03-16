const Router = require('express')
const router = new Router()
const reasonController = require('../controllers/reasonController')

router.post('/',reasonController.create)
router.get('/', reasonController.getAll)
router.get('/:id', reasonController.getOne)
router.get('/inst/', reasonController.getAllInstitutions)
router.delete('/:id', reasonController.delete)

module.exports = router