const db = require('../models')
const Lessons = db.lessons

class LessonService {
    async getAll() {
        return await Lessons.findAll()
    }

    async getById(id) {
        return await Lessons.findOne({
            where: { id },
        })
    }

    async create(value) {
        return await Lessons.create(value)
    }

    async update(value, id) {
        return Lessons.findOne({ where: { id: id } }).then(function (obj) {
            if (obj) return obj.update(value)
        })
    }

    async remove(id) {
        return Lessons.destroy({ where: { id: id } })
    }
}

module.exports = new LessonService()
