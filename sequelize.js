const Sequelize = require('sequelize');
const sequelize = new Sequelize('snackorder', 'postgres', '123123',{
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});

sequelize
    .sync()
    .then(()=> {
        console.log('connection has been established successfully');
    })
    .catch((err) => {
        console.log('unable to connect to the database ', err);
    });
module.exports = sequelize;