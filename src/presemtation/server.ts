import express, { Router } from 'express';
import path from 'path';



//* Opciones paara utilizar las variables de entorno del archivo .env
interface Options {
    port: number,
    public_path?: string,
    routes: Router,
}


export class Server {

    //* Propiedades de la clase Server
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {

        const { port,routes, public_path = 'public' } = options; //* Se desestructuran las propiedades de la interfaz options 

        //* Se inicializan las propiedades de la clase Server 
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {

        //* Midelware
        this.app.use(express.json());//* para que el servidor entienda las peticiones en formato json como en el post que recibe por body
        this.app.use(express.urlencoded({ extended: true }));//* para que el servidor entienda las peticiones en formato urlencoded como en el post que recibe por body

        //* Public Folder
        this.app.use(express.static(this.public_path));//* esto es mas que todo para SAP

        //* Routes
        this.app.use(this.routes); //* Se usa el router de las rutas definidas en la clase

        //* Si hace una peticion a cualquier ruta que no exista se redirecciona a index html y precede a cargarla
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
            return
        })

        //* Se levanta el servidor
        this.app.listen(3000, () => {
            console.log(`Server Listening on port ${ this.port }`);
        });
    }
}