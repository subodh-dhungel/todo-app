const Sequelize = require('sequelize')
const sequelize = require('../connection')

const todoContentsTable = sequelize.define('TodoContents',{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    content: {
        type: Sequelize.STRING(255),
        allowNull: false,
    }
})

const table2 = sequelize.define('table2', {
    id: {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    data: {
        type: Sequelize.STRING(255),
    }
})

// sequelize.sync({
//     alter: true,
// })

module.exports = {todoContentsTable}