import { Component } from "@angular/core";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-reporte",
  templateUrl: "./reporte.html",
  styleUrls: ["./reporte.css"]
})
export class ReporteComponent {

    constructor() {
  }

    // This component currently does not have any specific logic or properties.
    imprimirReporte(): void {
       setTimeout(() => {
        const DATA = document.getElementById('Hoja');
        if (DATA) {
          const doc = new jsPDF('p', 'pt', 'a4');
          doc.html(DATA, {
            callback: (doc) => {
              doc.save('reporte.pdf');
            },
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 650
          });
        } else {
          console.error("Elemento con id 'Hoja' no encontrado.");
        }
      }, 1000);

    }

  // Método alternativo para generar PDF (opcional)
  descargarPDF(): void {
    // Esta función podría implementarse con una librería como jsPDF
    console.log('Función para generar PDF - requiere librería adicional');
  }
  // Component logic goes here
}
