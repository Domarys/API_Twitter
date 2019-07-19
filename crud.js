// @DomarysCorrea_2019
// domaryscorrea@gmail.com
// description API_Twitter

const Sequelize = require('sequelize')
const sequelize = new Sequelize('u148181256_tst','u148181256_tst','123456',{host:"sql159.main-hosting.eu.", dialect: 'mysql'})

sequelize.authenticate().then(function(){
	console.log("conectado com sucesso")
}).catch(function(erro){
	console.log("falha ao se conectar: "+erro)
})