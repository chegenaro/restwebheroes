import { envs } from "./config/envs";
import { AppRoutes } from "./presemtation/routes";
import { Server } from "./presemtation/server";





(async()=>{
main();
})()


function main() {

    //* La instancia de la clase Server en el constructor de la clase pide un objeto de tipo Options, por eso se le pasan las propiedades de la interfaz port y public_path, se la puedes inyectar por envs o por defecto, pero debe de estar los parametros de la interface Options, ya que eso lo pide el constructor
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATh,
        routes: AppRoutes.routes,//* se n ecesita para injectar a la clse server y asi llamr las rutas     
    });


    
    server.start(); 
}