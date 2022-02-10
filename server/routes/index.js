const Router = require('express')
const router = new Router()
const memeRouter = require('./memeRouter')
const meme_markRouter = require('./meme_markRouter')
const complaintRouter = require('./complaintRouter')
const reasonRouter = require('./reasonRouter')

router.use('/meme', memeRouter)
router.use('/meme_mark', meme_markRouter)
router.use('/complaint', complaintRouter)
router.use('/reason', reasonRouter)

module.exports = router
