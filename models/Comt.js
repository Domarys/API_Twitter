// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// model description of comments

const db = require('./db_conection')

const Comt = db.sequelize.define('comt',{
    idComt: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idPost: {
      type: db.Sequelize.INTEGER,
      foreignKey: true
    },
    username: {
      type: db.Sequelize.STRING
    },
    text: {
      type: db.Sequelize.TEXT
    },
    date: {
      type: db.Sequelize.DATE,
      defaultValue: db.Sequelize.NOW
    }
})

//Comt.sync({force: true})
module.exports = Comt
