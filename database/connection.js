const Sequelize = require('sequelize')
const sequelize = new Sequelize("todolist","root", 'coder@katunje5', {
    host : '127.0.0.1',
    dialect: 'mysql',
    operatorAliases: false,
})

module.exports = sequelize
global.sequelize = sequelize