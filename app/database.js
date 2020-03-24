const Sequelize = require('sequelize')

var db = {}
// new Sequelize('wang-box', 'wang', 'x=Tkqv3.*', {
//     host: 'localhost',
//     dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });
const sequelize = new Sequelize('wang-box', 'root', 'password', {
    host: 'localhost',
    // port: '3004', note: 添加 port 会有错误
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
})

let models = [
    require('./models/priorities.js'),
    require('./models/status.js'),
    require('./models/tickets.js'),
    require('./models/users.js'),
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
