const {Meme} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class MemeController {
    async create(req, res) {
        try {
            const {vk_route, text} = req.body
            const {images} = req.files
            let fileName = uuid.v4() + '.jpg'
            await images.mv(path.resolve(__dirname, '..', 'static', fileName))
            const meme = await Meme.create({
                img: fileName,
                vk_route: vk_route,
                text: text,
            })
            return res.json({meme})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // функция createAll, для нескольких постов

    async getAll(req, res) {
        // let {} = req.query
        // Возможно добавить сортировку по данным вк...
        let memes
        memes = await Meme.findAll()
        return res.json(memes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const meme = await Meme.findOne(
            {where: {id}},
        )
        return res.json(meme)
    }

    async update(req, res) {
        try {
        const {id, vk_route, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + '.jpg'
        await image.mv(path.resolve(__dirname, '..', 'static', fileName))
        const meme = await (await Meme.findOne({where: {id:id}},))
                .update({img: fileName, vk_route: vk_route, text: text})
        return res.json({meme})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    async delete(req, res) {
        try {
        const {values} = req.body
        let results = []
        for (let i in values) {
            const {id} = values[i]
            const meme = await (await Meme.findOne({where: {id}},))
                .destroy()
            results.push(meme)
        }
        return res.json({results})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }
}

module.exports = new MemeController()