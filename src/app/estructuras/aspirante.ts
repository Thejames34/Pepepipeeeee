export class aspirante{

    ID_ASP:string ='';
    NOMBRE_ASP: string = '';
    APELLIDOS_ASP: string = '';
    EXPERIENCIA_ASP: string = '';
    FECHAAPLICACION_ASP: string = '';
    MUNICIPIO_ASP: string = '';
    EDAD_ASP: string = '';
    PUESTO_ASP: string = '';
    ESTATUS_ASP: string = '';
    EDICION_ASP: boolean = false;


    constructor(){

    }

    llenadoDatos(data:any){
        this.ID_ASP=data.ID_ASP;
        this.NOMBRE_ASP = data.NOMBRE_ASP;
        this.APELLIDOS_ASP = data.APELLIDOS_ASP;
        this.EXPERIENCIA_ASP = data.EXPERIENCIA_ASP;
        this.FECHAAPLICACION_ASP = data.FECHAAPLICACION_ASP;
        this.MUNICIPIO_ASP = data.MUNICIPIO_ASP;
        this.EDAD_ASP = data.EDAD_ASP;
        this.PUESTO_ASP = data.PUESTO_ASP;
        this.ESTATUS_ASP = data.ESTATUS_ASP || 'Pendiente';

    }
}