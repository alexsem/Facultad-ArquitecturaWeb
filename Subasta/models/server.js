const express    = require('express');
const mongo = require('./database');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.autoPath = '/auto';
        this.usuarioPath = '/usuario';
        this.subastaPath = '/subasta'

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Iniciar conexion a la base de datos
        this.database();
    }

    middlewares() {
        // CORS
        // this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.autoPath, require('../routes/auto.routes'));
        this.app.use( this.usuarioPath, require('../routes/usuario.routes'));
        this.app.use( this.subastaPath, require('../routes/subasta.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

    database() {
        mongo.connect();
    }

}

module.exports = Server;


