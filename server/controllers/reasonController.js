const {Reason} = require('../models/models')
const ApiError = require('../error/ApiError')

class ReasonController {
    _institutions = {
        1: "Администрация ВК",
        2: "Прокуратура РФ",
        3: "Президент РФ"
    }

    async create(req, res) {
        try {
            const {reason, institution_item} = req.body

            const rsn = await Reason.create({
                reason: reason,
                institution_item: institution_item,
            })
            return res.json({rsn})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // функция createAll, для нескольких постов

    async getAll(req, res) {
        let {institution_item} = req.query
        let rsn
        if(institution_item) {
            rsn = await Reason.findAll({where: {institution_item: institution_item}})
        }
        else
        {
            rsn = await Reason.findAll()
        }
        let results = []
        for (let c in rsn) {
            results.push({
                reason: rsn[c].reason,
                institution_item: rsn[c].institution_item,
                institution: this._institutions[rsn[c].institution_item]
            })
        }
        return res.json(results)
    }

    async getAllInstitutions(req, res) {
        return res.json(this._institutions)
    }

    async getOne(req, res) {
        const {id} = req.params
        const rsn = await Reason.findOne(
            {where: {id}},
        )
        let result = []
            result.push({
                reason: rsn.reason,
                institution_item: rsn.institution_item,
                institution: this._institutions[rsn.institution_item]
            })
        return res.json(rsn)
    }

    async delete(req, res) {
        try {
            const {values} = req.body
            let results = []
            for (let i in values) {
                const {id} = values[i]
                const rsn = await (await Reason.findOne({where: {id}},))
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

module.exports = new ReasonController()