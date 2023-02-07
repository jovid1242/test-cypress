const LessonService = require('../services/lessonService')
const HomeWorkService = require('../services/HomeWorkService')
const path = require('path')
const uuid = require('uuid')

class LessonController {
    async getAll(req, res, next) {
        try {
            const data = await LessonService.getAll() 

            return res.json({data})
        } catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            let data = await LessonService.remove(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            let params = req.body
            let file = req.files.attachment

            const newNameFile = `${uuid.v4()}.pdf`
            const pathFile = path.join(
                __dirname,
                `/../attachment/${newNameFile}`
            )
            file.mv(pathFile, (err) => {
                if (err) {
                    // throw ApiError.BadRequest('Ошибка при загрузка файла')
                    return res.json({ message: 'Ошибка при загрузка файла' })
                }
            })

            const data = await LessonService.create({
                name: params.name,
                course_id: params.course_id,
                attachment: newNameFile,
            })
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            let params = req.body
            let file = req.files.attachment

            if (req.files !== null) {
                const newNameFile = `${uuid.v4()}.pdf`

                file.mv(
                    path.join(__dirname + '/../attachment') + newNameFile,
                    (err) => {
                        if (err) {
                            throw ApiError.BadRequest(
                                'Ошибка при загрузка файла'
                            )
                        }
                    }
                )

                const data = await LessonService.update(
                    {
                        name: params.name,
                        course_id: params.course_id,
                        attachment: params.newNameFile,
                    },
                    req.params.id
                )
                return res.json({ data })
            } else {
                const data = await LessonService.update(
                    {
                        name: params.name,
                        course_id: params.course_id,
                        attachment: params.attachment,
                    },
                    req.params.id
                )
                return res.json({ data })
            }
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const data = await LessonService.getById(req.params.id)
            return res.json({ data })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessonController()
