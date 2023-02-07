'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class lessons extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    lessons.init(
        {
            name: DataTypes.STRING,
            course_id: DataTypes.STRING,
            attachment: DataTypes.STRING,
            complete: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'lessons',
            tableName: 'lessons',
        }
    )
    return lessons
}
