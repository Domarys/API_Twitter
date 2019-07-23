// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter
// acesso bd - (localhost)

const Sequelize = require('sequelize')
const sequelize = new Sequelize('db_test','root','',
	{host:"localhost", dialect: 'mysql'})

sequelize.authenticate().then(function(){
	console.log("conectado com sucesso")
}).catch(function(erro){
	console.log("falha ao se conectar: "+ erro)
})

module.exports = {
	sequelize: sequelize,
	Sequelize: Sequelize
}
