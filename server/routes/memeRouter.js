const Router = require('express')
const router = new Router()
const memeController = require('../controllers/memeController')

router.post('/', memeController.create)
router.get('/', memeController.getAll)
router.get('/:id', memeController.getOne)
router.post('/classifyToxicText', memeController.classifyByToxicText)
router.post('/classifySomeText', memeController.classifyBySomeParamsText)
router.post('/classifyPic', memeController.classifyPic)
router.post('/scanPic', memeController.scanPic)
router.post('/userVK', memeController.VkUsersData)
router.post('/groupVK', memeController.VkGroupsData)
router.put('/', memeController.update)
router.delete('/:id', memeController.delete)

module.exports = router
