const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});


// Conexão ao banco de dados (instalar o mongoose no inicio)
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("ERRO: "+error.message)
});

//Carregando todos os Models

require('./models/Post');


const app = require('./app');




app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: "+server.address().port);
});