import express from 'express';
import path from 'path';



//* Opciones paara utilizar las variables de entorno del archivo .env
interface Options {
    port: number,
    public_path?: string
}


export class Server {

    //* Propiedades de la clase Server
    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {

        const { port, public_path = 'public' } = options; //* Se desestructuran las propiedades de la interfaz options 

        //* Se inicializan las propiedades de la clase Server 
        this.port = port;
        this.public_path = public_path;
    }

    async start() {

        //* Midelware

        //* Public Folder
        this.app.use(express.static(this.public_path));

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