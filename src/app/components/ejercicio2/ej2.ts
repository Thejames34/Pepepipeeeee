import { Component, ChangeDetectorRef } from "@angular/core";
import { pelicula } from "src/app/estructuras/general";
import { Firestore, collection, collectionData, doc, query, setDoc, where, deleteDoc } from "@angular/fire/firestore";
import Swal from 'sweetalert2'


@Component({
    selector: 'ej-dos',
    templateUrl: './ej2.html',
    styleUrls: ['./ej2.css']
})
export class EjDosComponent {

    peliculaModal:pelicula = new pelicula();

    listadopeliculas:pelicula[] = [];

    coleccionPeliculas = collection(this.firestore, 'Pelicula');



    constructor(private firestore: Firestore, private cdr: ChangeDetectorRef){
        console.log("Inicializando componente...");
        
        // Simulación de datos para depuración
        setTimeout(() => {
            if (this.listadopeliculas.length === 0) {
                console.log("PRUEBA DE EMERGENCIA: Agregando datos de prueba...");
                const peliculaPrueba = new pelicula();
                peliculaPrueba.titulo = "PELÍCULA DE PRUEBA";
                peliculaPrueba.estatus = "En cartelera";
                peliculaPrueba.ID_PEL = "test123";
                this.listadopeliculas.push(peliculaPrueba);
                this.cdr.detectChanges();
            }
        }, 3000);
        
        const consulta = query(this.coleccionPeliculas);
        collectionData(consulta, {idField: 'ID_PEL'}).subscribe((listadoPelicula) => {
            console.log("Datos recibidos:", listadoPelicula.length, "películas");
            
            this.listadopeliculas = []; 
            listadoPelicula.forEach((peli) => {
                const peliculaObj = new pelicula();
                peliculaObj.llenado(peli);
                this.listadopeliculas.push(peliculaObj);
                console.log(`Película añadida: ${peliculaObj.titulo}, Estatus: '${peliculaObj.estatus}'`);
            });
            
            console.log("Total películas procesadas:", this.listadopeliculas.length);
            // Forzar detección de cambios
            this.cdr.detectChanges();
        }, error => {
            console.error("Error al obtener datos:", error);
        });
    }

    abrireditarPelicula(pelicula:pelicula){
        this.peliculaModal = pelicula;
        this.peliculaModal.edicion = true; // para que sepa que es una edicion
        console.log(this.peliculaModal);
        document.getElementById("cerrarModal")?.click();
        
    }
    
    abrirFormulario(){
        this.peliculaModal = new pelicula();
        this.peliculaModal.edicion = false; // para que sepa que es un nuevo registro
        // Opcional: puedes limpiar el formulario aquí si es necesario
    }

    editarPelicula(){
        
        const ruta = doc(this.firestore, 'Pelicula', this.peliculaModal.ID_PEL);
         setDoc(ruta, JSON.parse(JSON.stringify(this.peliculaModal))).then(() => {
            this.peliculaModal = new pelicula();
            document.getElementById("cerrarModal")?.click();
        }).catch((error) => {
            console.error("Error al registrar la película: ", error);
        });

    }

     registrarPelicula(){

        this.peliculaModal.ID_PEL = this.generarListadoPeliculas(15);

        const ruta = doc(this.firestore, 'Pelicula', this.peliculaModal.ID_PEL);
         setDoc(ruta, JSON.parse(JSON.stringify(this.peliculaModal))).then(() => {
            this.peliculaModal = new pelicula();
            document.getElementById("cerrarModal")?.click();
        }).catch((error) => {
            console.error("Error al registrar la película: ", error);
        });
 
      
    }

    generarListadoPeliculas(tamano:number){
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let id = '';
        const totalLetras = letras.length;

        for (let i = 0; i < tamano; i++) {
            id += letras.charAt(Math.floor(Math.random() * totalLetras));
        }

        return id;
    }


    // Función para eliminar una película
    eliminarPelicula(pelicula:pelicula) {
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
                const ruta = doc(this.firestore, 'Pelicula', pelicula.ID_PEL);
                deleteDoc(ruta).then(() => {
                    this.listadopeliculas = this.listadopeliculas.filter(p => p.ID_PEL !== pelicula.ID_PEL);
                    Swal.fire(
                        '¡Eliminado!',
                        'La película ha sido eliminada.',
                        'success'
                    );
                }).catch((error) => {
                    console.error("Error al eliminar la película: ", error);
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar la película.',
                        'error'
                    );
                });
            }
        });
    }
    

}


