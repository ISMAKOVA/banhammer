const {Meme} = require('../models/models')
const ApiError = require('../error/ApiError')
const axios = require('axios')
const easyvk = require('easyvk')

class MemeController {
    async create(req, res) {
        try {
            const {image_url, vk_route, text} = req.body
            const meme = await Meme.create({
                img: image_url,
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
            const {id} = req.params
        const {image_url, vk_route, text} = req.body
        const meme = await (await Meme.findOne({where: {id:id}},))
                .update({img: image_url, vk_route: vk_route, text: text})
        return res.json({meme})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // post localhost:5000/api/meme/classifyPic
    // body raw json {url: "..."}
    async classifyPic(req, res){
        try {
        const {url} = req.body
        let result
        console.log(process.env.PICTURE_API + '/toxicity_py/api/picture')
        await axios.get(process.env.PICTURE_API + '/toxicity_py/api/picture', {data: {url:
            url}}).then(response => {
            result = response.data
        });
        console.log(result)
        return  res.json({
            unoffensive: result[0].untoxic,
            offensive: result[0].toxic})
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // post localhost:5000/api/meme/scanPic
    // body raw json {url: "..."}
    async scanPic(req, res){
        try {
            const {url} = req.body
            let result
            console.log(process.env.PICTURE_API + '/toxicity_py/api/picture_text')
            console.log(url)
            await axios.get(process.env.PICTURE_API + '/toxicity_py/api/picture_text', {
                data: {
                    url:
                    url
                }
            }).then(response => {
                result = response.data
            });
            console.log(result)
            return res.json({
                text: result.text
            })
        }
        catch {
            return res.json({
                text: "ОШИБКА ПРИ СКАНИРОВАНИИ"
            })
        }
    }

    // post localhost:5000/api/meme/classifyToxicText
    // body raw json {text: "..."}
    async classifyByToxicText(req, res){
        try {
        const {text} = req.body
        let result
        console.log(process.env.TOXIC_API + '/toxicity_py/api/messages', {messages: [text]})
        await axios.get(process.env.TOXIC_API + '/toxicity_py/api/messages', {data:
            {messages: [text, ""]}}).then(response => {
            result = response.data
        });
        console.log(result)
        return  res.json({
            text: result[0].message,
            toxic: result[0].toxic})
    } catch (e) {
        console.log(e);
        new ApiError(e.status, e.message)
    }
    }

    // post localhost:5000/api/meme/classifySomeText
    // body raw json {text: "..."}
    async classifyBySomeParamsText(req, res){
        try {
        const {text} = req.body
        let result
        console.log(process.env.TOXIC_API + '/toxicity_py/api/rude_feature_extraction')
        await axios.post(process.env.TOXIC_API + '/toxicity_py/api/rude_feature_extraction', {comment: text}).then(response => {
            result = response.data
        });
        return  res.json({
            text: text,
            proportion_rude_to_text: result})
    } catch (e) {
        console.log(e);
        new ApiError(e.status, e.message)
    }
    }

    // post localhost:5000/api/meme/groupVK
    // body raw json {"vkRoute":"1"}
    async VkGroupsData(req, res){
        try {
            const {vkRoute} = req.body
            let result

            let vk = easyvk({
                token: process.env.APP_TOKEN
            })
            vk.then(vk => result = vk.call('groups.getById', {group_ids:vkRoute}, 'get').then(a => {return res.json(a[0])}))
        } catch (e) {
            console.log(e);
            new ApiError(e.status, e.message)
        }
    }

    // post localhost:5000/api/meme/userVK
    // body raw json {"vkRoute":"1"}
    async VkUsersData(req, res){
        try {
            const {vkRoute} = req.body
            let result
            let vk = easyvk({
                token: process.env.APP_TOKEN
            })
            vk.then(vk => result = vk.call('users.get', {user_ids:vkRoute}, 'get').then(a => {return res.json(a[0])}))
        } catch (e) {
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