import { Router } from "express";
import { TodosController } from "./controller";






export class TodosRoutes {

    static get routes():Router {
        
        const router = Router();
        const todosController = new TodosController();//* se crea una instancia de la clase TodosController, para optener metodos y propiedades de la clase

        router.get('/', todosController.getTodos);//* se obtiene el metodo getTodos de la clase TodosController
        router.get('/:id', todosController.getTodoById);

        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);
        
        return router;
    }
}