const CourseDto = require('../dtos/courseDto')
const CourseService = require('../services/CourseService')

class CourseController {
    async getAll(req, res, next) {
        try {
            const data = await CourseService.getAll()
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            let params = req.body
            const data = await CourseService.update(params.name, req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            let data = await CourseService.remove(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            let params = req.body
            const data = await CourseService.create({
                name: params.name,
            })
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async getCourseById(req, res, next) {
        try {
            const data = await CourseService.getById(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CourseController()
