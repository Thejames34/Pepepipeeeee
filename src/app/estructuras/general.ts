export class pelicula {

    ID_PEL: string = '';
    titulo: string = '';
    horario:string = '';
    personas:number = 0;
    sala:string = ''; //al menos 5 salas(select)
    clasificacion:string = ''; //tambien select de al menos 5
    duracion:number = 0;
    descripcion:string = '';
    edicion:boolean = false; //select de al menos 5

    constructor(){



    }

    llenado(data:any){
        this.ID_PEL = data.ID_PEL;
        this.titulo = data.titulo;
        this.horario = data.horario;
        this.personas = data.personas;
        this.sala = data.sala;
        this.clasificacion = data.clasificacion;
        this.duracion = data.duracion;
        this.descripcion = data.descripcion;
      /*   this.edicion = data.edicion || false;  */
       /*     >:)   .....................................................................loading */  
    }

}