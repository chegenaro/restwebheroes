import { Router } from "express";
import { TodosRoutes } from "./todos/routes";





export class AppRoutes {

    static get routes():Router {
        
        const router = Router();   

        router.use('/api/todos', TodosRoutes.routes );//* se obtiene el metodo getTodos de la clase TodosController
        
        return router;
    }
}