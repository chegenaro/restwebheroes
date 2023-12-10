





export class CreateTodoDto {

    //* se coloca la propiedad que queremos validar dentro del constructor,en este caso estamos evaluando el text, si queremos otra la colocamos
    private constructor(
        public readonly text: string,//? se colocar todas las propiedades o argumentos que se va necesitar para crearlos
    ) { }


    //*Los métodos estáticos se crean en una clase cuando se quiere que ese método pueda ser llamado sin necesidad de crear una instancia de la clase
    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {//? las props seran un objeto las cuales va simular el body de la peticion req.body  que se va a enviar a la base de datos 

        const { text } = props;
        //* Aqui iria todas las validaciones que queramos
        if (!text) return ['text is required', undefined]; //? se retornan dos valores, el error y el dto

        return [undefined, new CreateTodoDto(text)]; //? se retornan dos valores, el error y el dto creado
    }

}