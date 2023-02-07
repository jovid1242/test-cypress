const HomeWorkService = require('../services/HomeWorkService')

class HomeWorkController {
    async getAll(req, res, next) {
        try {
            const data = await HomeWorkService.getAll()
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            let params = req.body
            const work = {
                name: params.name,
                course_id: params.course_id,
                lesson_id: params.lesson_id,
                complete: params.complete,
            }
            const data = await HomeWorkService.update(work, req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            let data = await HomeWorkService.remove(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            let params = req.body
            const work = {
                name: params.name,
                course_id: params.course_id,
                lesson_id: params.lesson_id,
                complete: false,
            }
            const data = await HomeWorkService.create(work)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const data = await HomeWorkService.getById(req.params.id)
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    

    async checkLesson(req, res, next) {
        try {
            const data = await HomeWorkService.check(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new HomeWorkController()
