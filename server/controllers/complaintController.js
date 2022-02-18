const {Complaint} = require('../models/models')
const ApiError = require('../error/ApiError')

class ComplaintController {
    async create(req, res){
        try {
            const {values} = req.body
            let results = []
            for(let i in values) {
                const {mark, memeId, reasonId, notes} = values[i]
                const complaint = await Complaint.create({mark:mark, memeId:memeId,
                    reasonId:reasonId, notes:notes})
                results.push(complaint)
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
        let {memeId, reasonId} = req.query
        let complaints
        if(!memeId && !reasonId) {
            complaints = await Complaint.findAll()
        }
        if(memeId && !reasonId) {
            complaints = await Complaint.findAll({where: {memeId:memeId}})
        }
        if(!memeId && reasonId) {
            complaints = await Complaint.findAll({where: {reasonId:reasonId}})
        }
        if(memeId && reasonId) {
            complaints = await Complaint.findAll({where: {memeId:memeId, reasonId:reasonId}})
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
            const {id, mark, memeId, reasonId, notes} = req.body
            const complaint = await (await Complaint.findOne({where: {id:id}},))
                .update({mark:mark, memeId:memeId, reasonId:reasonId, notes:notes},)
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