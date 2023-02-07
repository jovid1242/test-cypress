const db = require('../models')
const Homeworks = db.homeworks

class HomeWorkService {
    async getAll() {
        return await Homeworks.findAll()
    }

    async getById(id) {
        return await Homeworks.findOne({
            where: { id },
        })
    }

    async create(value) {
        return await Homeworks.create(value)
    }

    async update(value, id) {
        return Homeworks.findOne({ where: { id: id } }).then(function (obj) {
            if (obj) return obj.update(value)
        })
    }

    async remove(id) {
        return Homeworks.destroy({ where: { id: id } })
    }

    async check(lesson_id) {
        const { rows } = await Homeworks.findAndCountAll({
            where: {
                lesson_id,
            },
        })
        var completeLes = {
            totalPassed: 0,
            totalFailed: 0,
        }

        rows.forEach((element) => {
            if (element.complete) {
                completeLes.totalPassed += 1
            } else {
                completeLes.totalFailed += 1
            }
        })

        return completeLes.totalFailed === 0 ? true : false 
    }
}

module.exports = new HomeWorkService()
