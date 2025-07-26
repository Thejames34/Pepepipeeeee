import {Component, ChangeDetectorRef} from '@angular/core'
import {Firestore, collection, setDoc, deleteDoc, collectionData, query, doc} from '@angular/fire/firestore'
import {aspirante} from 'src/app/estructuras/aspirante'
import Swal from 'sweetalert2'


@Component({
    selector:'crud',
    templateUrl: './crud.html',
    styleUrls:['./crud.css'],

})

export class crud{
     aspiranteModal: aspirante = new aspirante();

     listaAspirantes:aspirante[] = []

     coleccionAspirantes = collection(this.firestore, 'Aspirante');

    constructor(private firestore: Firestore, private cdr:ChangeDetectorRef){
              const consulta = query(this.coleccionAspirantes);
                collectionData(consulta, {idField: 'ID_ASP'}).subscribe((listaAspirantes) => {
                   
                    
                    this.listaAspirantes = []; 
                    listaAspirantes.forEach((aspirantes) => {
                        const aspiranteS = new aspirante();
                        aspiranteS.llenadoDatos(aspirantes);
                        this.listaAspirantes.push(aspiranteS);
                       
                    });
                    
                   
                    // Forzar detección de cambios
                    this.cdr.detectChanges();
                }, error => {
                    console.error("Error al obtener datos:", error);
                });
       
    }

    abrirModal(){
        this.aspiranteModal = new aspirante();
        this.aspiranteModal.EDICION_ASP = false;
    }

       abrirEditarAspirante(aspirante:aspirante){
        this.aspiranteModal = aspirante;
        this.aspiranteModal.EDICION_ASP = true; // para que sepa que es una edicion
        console.log(this.aspiranteModal);
        document.getElementById("cerrarModal")?.click();
        
    }


         registrarAspirante(){
    
            this.aspiranteModal.ID_ASP = this.generarAspirantes(15);
    
            const ruta = doc(this.firestore, 'Aspirante', this.aspiranteModal.ID_ASP);
             setDoc(ruta, JSON.parse(JSON.stringify(this.aspiranteModal))).then(() => {
                this.aspiranteModal = new aspirante();
                document.getElementById("cerrarModal")?.click();
            }).catch((error) => {
                console.error("Error al registrar la película: ", error);
            });
     
          
        }
    

   editarAspirante(){
                Swal.fire({
                 title: '¿Estás seguro de Editar?',
                
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Confirmar Edicion',
                 cancelButtonText: 'Cancelar'
             }).then((result) => {
                 if (result.isConfirmed) {
         const ruta = doc(this.firestore, 'Aspirante', this.aspiranteModal.ID_ASP);
          setDoc(ruta, JSON.parse(JSON.stringify(this.aspiranteModal))).then(() => {
             this.aspiranteModal = new aspirante();
             document.getElementById("cerrarModal")?.click();
         }).catch((error) => {
             console.error("Error al registrar la Aspirante: ", error);
         })}});
 
     }

     generarAspirantes(tamano:number){
         const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let id = '';
        const totalLetras = letras.length;

        for (let i = 0; i < tamano; i++) {
            id += letras.charAt(Math.floor(Math.random() * totalLetras));
        }

        return id;
        
     }

    
         // Función para eliminar una película
         eliminarAspirante(aspirante:aspirante) {
             Swal.fire({
                 title: '¿Estás seguro?',
                 text: "¡No podrás revertir esto!",
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Sí, eliminar',
                 cancelButtonText: 'Cancelar'
             }).then((result) => {
                 if (result.isConfirmed) {
                     const ruta = doc(this.firestore, 'Aspirante', aspirante.ID_ASP);
                     deleteDoc(ruta).then(() => {
                         this.listaAspirantes = this.listaAspirantes.filter(p => p.ID_ASP !== aspirante.ID_ASP);
                         Swal.fire(
                             '¡Eliminado!',
                             'El Aspirante ha sido eliminada.',
                             'success'
                         );
                     }).catch((error) => {
                         console.error("Error al eliminar el Aspirante : ", error);
                         Swal.fire(
                             'Error',
                             'No se pudo eliminar el Aspirante.',
                             'error'
                         );
                     });
                 }
             });
         }
     

   
}