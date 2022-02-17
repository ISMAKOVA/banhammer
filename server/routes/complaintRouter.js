const Router = require('express')
const router = new Router()
const complaintController = require('../controllers/complaintController')

router.post('/',complaintController.create)
router.get('/',complaintController.getAll)
router.get('/:id',complaintController.getOne)
router.put('/',complaintController.update)
router.delete('/',complaintController.delete)

module.exports = router