import { Component } from "@angular/core";
import { pelicula } from "src/app/estructuras/general";
import { Firestore, collection, collectionData, doc, query, setDoc, where, deleteDoc } from "@angular/fire/firestore";


@Component({
    selector: 'ej-dos',
    templateUrl: './ej2.html',
    styleUrls: ['./ej2.css']
})
export class EjDosComponent {

    peliculaModal:pelicula = new pelicula();

    listadopeliculas:pelicula[] = [];

    coleccionPeliculas = collection(this.firestore, 'Pelicula');



    constructor(private firestore: Firestore){
        const consulta = query(this.coleccionPeliculas);
        collectionData(consulta, {idField: 'ID_PEL'}).subscribe((listadoPelicula) => {
            this.listadopeliculas = []; 
            listadoPelicula.forEach((peli) => {
                const peliculaObj = new pelicula();
                peliculaObj.llenado(peli);
                this.listadopeliculas.push(peliculaObj);
            });
           
        });
    }

    abrireditarPelicula(pelicula:pelicula){
        this.peliculaModal = pelicula;
        this.peliculaModal.edicion = true; //para que sepa que es una edicion
        console.log(this.peliculaModal);
        document.getElementById("cerrarModal")?.click();
        
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
        const ruta = doc(this.firestore, 'Pelicula', pelicula.ID_PEL);
        deleteDoc(ruta).then(() => {
            this.listadopeliculas = this.listadopeliculas.filter(p => p.ID_PEL !== pelicula.ID_PEL);
        }).catch((error) => {
            console.error("Error al eliminar la película: ", error);
        });
    }
    

}


