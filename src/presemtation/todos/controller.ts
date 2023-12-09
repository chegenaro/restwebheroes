import { Request, Response } from "express"

const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false }
]



export class TodosController {

    constructor() { }


    public getTodos = (req: Request, res: Response) => { //* Colocar el tipo de dato req: Request, res: Response son de express hay que importar
        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        const todo = todos.find(t => t.id === id);

        (todo) ? res.json(todo) : res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

    }

    public createTodo = (req: Request, res: Response) => {
        const { title } = req.body; //* se desestructura el body de la peticion para solo obterner el title o lo que se necesite, si se necesita todos los datos colocamos solamente el body

        if (!title) return res.status(400).json({ message: 'Title is required' });//* se valida que el title no este vacio y asi con los demas datos que se necesiten 

        const newTodo = {
            id: todos.length + 1,
            title,
            completed: false
        }
        todos.push(newTodo);

        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' }); 
        
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });

        todo.title = title;  
        //! OJO referencia

        res.json(todo); 

    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    }
}