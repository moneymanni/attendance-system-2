const Sequelize = require('sequelize');

module.exports = class Timer extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            time: {
                type: Sequelize.DATE(),
                allowNull: false
            },
            authKey: {
                type: Sequelize.STRING(),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Timer',
            tableName: 'timers',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Timer.belongsTo(db.Lecture, { foreignKey: 'lectureCode', targetKey: 'code' });
        db.Timer.belongsToMany(db.User, { through: 'Attendance'});
    }
};