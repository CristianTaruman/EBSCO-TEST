# EBSCO-TEST
Aplicacion de prueba para la postulacion de puesto trabajo EBSCO

El proyecto necesita los siguientes modulos para funcionar:

npm install express morgan mysql underscore

npm install axios

npm install --save ag-grid-community ag-grid-react

Ademas funciona sobre MYSQL.
Favor instalar la BD y ejecutar el script en:
MYSQL BD BACKUP.zip

Luego ejecutar el proyecto con el comando:
npm run dev

El proyecto se ejecuta sobre el puerto 3000, favor abrir y disponer del puerto 3000 al ejecutar el proyecto.
En ./src/index.js: linea 8 puede disponer de la direccion del puerto.
Finalmente, una vez ejecutado el proyecto, abrir el navegador y acceder al proyecto mediante:
http://localhost:3000/

Puede loguearse usando el usuario:
cris.taruman@gmail.com/coluntoda1254
El metodo de logueo sea mediante POST y la lista desplegada posteriormente sera obtenida por GET.

Dentro podra ver una lista de usuarios cuyos correos son el username y la password para todos sera "coluntoda1254"
Servicios de PUT y DELETE estan habilitados pero las interfaces estan en desarrollo.

SERVICIOS:

GET   http://localhost:3000/api/users/            Obtencion de todos los usuarios

GET   http://localhost:3000/api/users/id          Obtencion de un usuario en particular

POST  http://localhost:3000/api/users/op=auth     Metodo para autenticacion

body { "email": "alfonso.sebastian@gmail.com", "password": "coluntoda1254" }

POST  http://localhost:3000/api/users/op=ins      Metodo para insertar un nuevo usuario

body { "primer_nombre": "Barbara","segundo_nombre": "Del Carmen","primer_apellido": "Betancourt","segundo_apellido": "Cuevas","birthday": "1954/10/10","email": "barby642@gmail.com","password": "coluntoda1254" }

Adicional: El formato de fecha es: YYYY-MM-DD.

PUT   http://localhost:3000/api/users/id          Metodo para actualizar un usuario

body { "primer_nombre": "Barbara","segundo_nombre": "Del Carmen","primer_apellido": "Betancourt","segundo_apellido": "Cuevas","birthday": "1954/10/10","email": "barby642@gmail.com","password": "coluntoda1254" }

DEL  http://localhost:3000/api/users/id           Metodo para borrar un usuario.

Saludos.
