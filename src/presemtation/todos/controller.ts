import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"


// const todos = [
//     { id: 1, title: 'Todo 1', completed: false },
//     { id: 2, title: 'Todo 2', completed: true },
//     { id: 3, title: 'Todo 3', completed: false }
// ]



export class TodosController {

    constructor() { }


    public getTodos = async (req: Request, res: Response) => { //? Colocar el tipo de dato req: Request, res: Response son de express hay que importar
        // return res.json(todos)

        return res.json(await prisma.todo.findMany())

    }

    public getTodoById = async (req: Request, res: Response) => {

        // const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        // const todo = todos.find(t => t.id === id);

        // (todo) ? res.json(todo) : res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        const todo = await prisma.todo.findFirst({ where: { id } });

        (todo) ? res.json(todo) : res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });


    }

    public createTodo = async (req: Request, res: Response) => {
        // const { title } = req.body; //? se desestructura el body de la peticion para solo obterner el title o lo que se necesite, si se necesita todos los datos colocamos solamente el body
        // if (!title) return res.status(400).json({ message: 'Title is required' });//? se valida que el title no este vacio y asi con los demas datos que se necesiten 
        // const newTodo = {
        //     id: todos.length + 1,
        //     title,
        //     completed: false
        // }
        // todos.push(newTodo);

        // res.json(newTodo)

        //* extraemos el body de la peticion y validamos
        //const { text } = req.body;//? aqui trabajamos con prisma, por eso coloque text. para que no me diera error 
        //if (!text) return res.status(400).json({ message: 'Title is required' });//? Prisma
        // const todo = await prisma.todo.create({
        //     data: { text }
        // })

        //* Con DTO
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo);

    }

    public updateTodo = async (req: Request, res: Response) => {

        // const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' }); 

        // const { title } = req.body;
        // if (!title) return res.status(400).json({ message: 'Title is required' });

        // todo.title = title;  
        // //! OJO referencia

        // res.json(todo); 

        //* sin DTO
        // const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        // const todo = await prisma.todo.findFirst({ where: { id } });

        // if (!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });


        // const { text, completedAt } = req.body;

        // const updateTodo = await prisma.todo.update({
        //     where: { id },
        //     data: {
        //         text,
        //         completedAt: completedAt ? new Date(completedAt) : null
        //     }
        // })

        // return res.json(updateTodo);

        //* Con DTO
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if ( error ) return res.status(400).json({ error });
        
        const todo = await prisma.todo.findFirst({
          where: { id }
        });
    
        if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );
    
        const updatedTodo = await prisma.todo.update({
          where: { id },
          data: updateTodoDto!.values
        });
      
        res.json( updatedTodo );
    

    }

    public deleteTodo = async (req: Request, res: Response) => {

        // const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ message: 'Invalid id, the id must be a number' });

        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

        // todos.splice(todos.indexOf(todo), 1);

        // res.json(todo);

        const id = +req.params.id;
        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) return res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

        const deleted = await prisma.todo.delete({ where: { id } });

        (deleted) ? res.json(deleted) : res.status(404).json({ message: 'TODO whith id ' + id + ' not found' });

        return res.json({ todo, deleted });
    }
}