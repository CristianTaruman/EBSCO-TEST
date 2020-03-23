//Iniciacion de modulos del proyecto
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(express.static(path.join(__dirname, '../', 'build')));//Defino la url statica del sistema

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
//Vinculo la url '/' al archivo index en build
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'build', 'index.html'))
});
app.use('/api/users', require('./routes/index'));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});

//Iniciar: npm run dev