const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            userType: {
                type: Sequelize.INTEGER(),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(2000),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.User.hasMany(db.Board, { foreignKey: 'userId', sourceKey: 'id' });
        db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id' });
        db.User.belongsToMany(db.Lecture, { through: 'Registration' });
        db.User.belongsToMany(db.Timer, { through: 'Attendance'});
    }
};