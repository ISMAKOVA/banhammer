const {Meme_Mark, Meme} = require('../models/models')
const ApiError = require('../error/ApiError')

class Meme_markController {
    async create(req, res) {
        try {
            const {mark, memeId} = req.body
            const meme_mark = await Meme_Mark.create({mark: mark, memeId: memeId})
            return res.json({meme_mark})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    async getAll(req, res) {
        const {memeId} = req.query
        let meme_mark
        if (memeId) {
            meme_mark = await Meme_Mark.findAll({where: {memeId: memeId}})
        } else {
            meme_mark = await Meme_Mark.findAll()
        }
        return res.json(meme_mark)
    }

    async getOne(req, res) {
        const {id} = req.params
        const meme_mark = await Meme_Mark.findOne(
            {where: {id}},
        )
        return res.json(meme_mark)
    }

    async getSummarizedMarkForMeme(req, res) {
        try {
            const {memeId} = req.params
            const meme_marks = await Meme_Mark.findAll(
                {where: {memeId: memeId}},
            )
            const meme = await (await Meme.findOne({where: {id:memeId}},))

            let sum = 0
            for (let i in meme_marks) {
                sum += Number(meme_marks[i]?.mark)
            }
            let result = sum / meme_marks?.length
            return res.json({id:meme.id, img: meme.img, vk_route: meme.vk_route, text: meme.text, mark_result: isNaN(result)? 0: result})
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
                const rsn = await (await Meme_Mark.findOne({where: {id}},))
                    .destroy()
                results.push(rsn)
            }
            return res.json({results})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }
}

module.exports = new Meme_markController()
