const {Complaint} = require('../models/models')
const ApiError = require('../error/ApiError')

class ComplaintController {
    async create(req, res){
        try {
            const {values} = req.body
            let results = []
            for(let i in values) {
                const {mark, memeMarkId, reasonId, notes} = values[i]
                const meme_mark = await Complaint.create({mark:mark, memeMarkId:memeMarkId,
                    reasonId:reasonId, notes:notes})
                results.push(meme_mark)
            }
            return res.json({results})
        }
        catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // функция createAll, для нескольких постов

    async getAll(req, res){
        try {
        let {memeMarkId, reasonId} = req.query
        let complaints
        if(!memeMarkId && !reasonId) {
            complaints = await Complaint.findAll()
        }
        if(memeMarkId && !reasonId) {
            complaints = await Complaint.findAll({where: {memeMarkId:memeMarkId}})
        }
        if(!memeMarkId && reasonId) {
            complaints = await Complaint.findAll({where: {reasonId:reasonId}})
        }
        if(memeMarkId && reasonId) {
            complaints = await Complaint.findAll({where: {memeMarkId:memeMarkId, reasonId:reasonId}})
        }
        return res.json(complaints)
        }
        catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    async getOne(req, res){
        const {id} = req.params
        const complaint = await Complaint.findOne(
            {where: {id}},
        )
        return res.json(complaint)
    }

    async update(req, res) {
        try {
            const {id, mark, memeMarkId, reasonId, notes} = req.body
            const complaint = await (await Complaint.findOne({where: {id:id}},))
                .update({mark:mark, memeMarkId:memeMarkId, reasonId:reasonId, notes:notes},)
            return res.json({complaint})
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
                const complaint = await (await Complaint.findOne({where: {id}},))
                    .destroy()
                results.push(complaint)
            }
            return res.json({results})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }
}

module.exports = new ComplaintController()