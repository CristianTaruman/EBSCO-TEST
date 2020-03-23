//Rutinas y logicas de metodos GET, POST, PUT y DELETE
const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const mysqlConnection = require('../database');

//metodo que retorna todos los usuarios
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,DATE_FORMAT(BIRTHDAY,"%d-%m-%Y") BIRTHDAY,EMAIL,PASSWORD FROM USUARIOS', ( err, rows, fields ) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});

//metodo que retorna un usuario en particular
//necesita ID del usuario como argumento
router.get('/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('SELECT PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,DATE_FORMAT(BIRTHDAY,"%d-%m-%Y") BIRTHDAY,EMAIL,PASSWORD FROM USUARIOS WHERE ID=?', [id], ( err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    } );
});

//metodo para autenticar o crear un nuevo usuario dependiendo del parametro op
//valores permitidos: op=auth; op=ins
router.post('/:op', (req, res) => {
    const {op} = req.params;
    //Si el parametro es auth, verifico el correo y contraseña del usuario en la bd.
    if(op.substr(3) == 'auth'){
	console.log(req.body);
        const { email, password } = req.body;
        if( email && password ){
            mysqlConnection.query('SELECT PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,DATE_FORMAT(BIRTHDAY,"%d-%m-%Y") BIRTHDAY,EMAIL,PASSWORD FROM USUARIOS WHERE EMAIL=? AND PASSWORD=?', [email,password], ( err, rows, fields ) => {
                if(!err){
                    if(rows.length > 0){
                        res.status(200).json(rows[0]);    
                    }else{
                        res.status(204).send('No match for the giving user/pass');
                    }
                }else{
                    console.log(err);
                    res.status(500).send('Internal Error. Please try later or comunicate to the ADM');
                }
            } );
        }else{
            res.status(500).send('Bad request: Missing fields in json');
        }
        //Si el parametro es ins, inserto registro en bd
    }else if(op.substr(3) == 'ins'){
        const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, birthday, email, password } = req.body;
        if( primer_nombre && segundo_nombre && primer_apellido && segundo_apellido && birthday && email && password ){
            const newUser = {...req.body};
            mysqlConnection.query('INSERT INTO USUARIOS(PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,BIRTHDAY,EMAIL,PASSWORD) VALUES(?,?,?,?,?,?,?)', [primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,birthday,email,password], ( err,rows,fields ) => {
                if(!err){
                    res.status(200).send('User created');
                }else{
                    console.log(err);
                    res.status(500).send('Internal Error. Please try later or comunicate to the ADM');
                }
            } );
        }else{
            res.status(500).json({error: 'Bad request: Missing fields in json'});
        }
    }else{
        res.status(404).send('Bad request: Invalid arguments');
    }
});

//metodo actualizar
router.put('/:id', (req, res) => {
    const {id} = req.params;
    if( id ){
        mysqlConnection.query('SELECT PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,DATE_FORMAT(BIRTHDAY,"%d-%m-%Y") BIRTHDAY,EMAIL,PASSWORD FROM USUARIOS WHERE ID=?', [id], (err, rows, fields) => {
            if(!err){
                if(rows.length > 0){
                    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, birthday, email, password } = req.body;
                    if( primer_nombre && segundo_nombre && primer_apellido && segundo_apellido && birthday && email && password ){
                        mysqlConnection.query('UPDATE USUARIOS SET PRIMER_NOMBRE=?,SEGUNDO_NOMBRE=?,PRIMER_APELLIDO=?,SEGUNDO_APELLIDO=?,BIRTHDAY=?,EMAIL=?,PASSWORD=? WHERE ID=?', [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, birthday, email, password, id], ( err, rows, fields ) => {
                            if(!err){
                                res.status(200).send('User updated');
                            }else{
                                console.log(err);
                                res.status(500).send('Internal Error. Please try later or comunicate with the ADM');
                            }
                        } );
                    }else{
                        res.status(500).send('Bad request: Missing fields in json');
                    }
                }else{
                    res.status(200).send('No match for the given id.');
                }
            }else{
                console.log(err);
                res.status(500).send('Internal server error');
            }
        });
    }else{
        res.status(500).send('Bad request: Missing arguments in URL');
    }
});

//metodo borrar
router.delete('/:id', (req, res) =>{
    const {id} = req.params;
    if(id){
        mysqlConnection.query('DELETE FROM USUARIOS WHERE ID=?', [id], (err, rows, fields) => {
            if(!err){
                res.status(200).send('User deleted');
            }else{
                console.log(err);
                res.status(500).send('Internal Error. Please try later or comunicate with the ADM');
            }
        } );
    }else{
        res.status(500).send('Bad request: Missing arguments in URL');
    }
});

module.exports = router;
