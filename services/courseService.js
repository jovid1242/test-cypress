const db = require('../models')
const Course = db.course

class CourseService {
    async getAll() {
        return await Course.findAll()
    }

    async getById(id) {
        return await Course.findOne({
            where: { id },
        })
    }

    async create(value) {
        return await Course.create(value)
    }

    async update(value, id) {
        return Course.findOne({ where: { id: id } }).then(function (obj) {
            if (obj) return obj.update(value)
        })
    }

    async remove(id) {
        return Course.destroy({ where: { id: id } })
    }
}

module.exports = new CourseService()
