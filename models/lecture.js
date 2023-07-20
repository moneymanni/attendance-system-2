const Sequelize = require('sequelize');

module.exports = class Lecture extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            code: {
                type: Sequelize.STRING(),
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(2000),
                allowNull: false
            },
            maxNum: {
                type: Sequelize.INTEGER(),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Lecture',
            tableName: 'lectures',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Lecture.hasMany(db.Timer, { foreignKey: 'lectureCode', sourceKey: 'code' });
        db.Lecture.belongsToMany(db.User, { through: 'Registration' });
    }
};