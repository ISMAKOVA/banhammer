const {Meme_Mark} = require('../models/models')
const ApiError = require('../error/ApiError')

class Meme_markController {
    async create(req, res){
        try {
            const {values} = req.body
            let results = []
            for(let i in values) {
                const {mark, memeId} = values[i]
                const meme_mark = await Meme_Mark.create({mark: mark, memeId: memeId})
                results.push(meme_mark)
            }
            return res.json({results})
        }
        catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    async getAll(req, res){
        const {memeId} = req.query
        let meme_mark
        if(memeId){
            meme_mark = await Meme_Mark.findAll({where:{memeId:memeId}})
        }
        else {
            meme_mark = await Meme_Mark.findAll()
        }
        return res.json(meme_mark)
    }

    async getOne(req, res){
        const {id} = req.params
        const meme_mark = await Meme_Mark.findOne(
            {where: {id}},
        )
        return res.json(meme_mark)
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