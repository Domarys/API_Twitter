// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// model description of post
const db = require('./db_conection')

const Post = db.sequelize.define('post',{
    idPost: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: db.Sequelize.STRING,
      foreignKey: true
    },
    title: {
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

//Post.sync({force: true})
module.exports = Post
