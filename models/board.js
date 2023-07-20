const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(),
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT(),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Board.hasMany(db.Comment, { foreignKey: 'boardId', sourceKey: 'id' });
        db.Board.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};