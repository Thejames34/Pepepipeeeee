import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './prueba.html',
  styleUrls: ['./prueba.css']
})
export class PruebaComponent {

  hola:string = 'Hola';
array: string[] = new Array() 

  img:boolean = true;

  status: string = 'Fase1';


  constructor() {
    this.hola = 'Mundo ir a donde dar gana';
    console.log('PruebaComponent initialized');
    this.array.push('Hola');
    this.array.push('Mundo');
    this.array.push('Como');
    this.array.push('Estas');
    this.array.push('Hola');
    this.array.push('Mundo');
    this.array.push('Como');
    this.array.push('Estas');
  }
  // Define a property to hold the title

  cambiartexto() {
    this.hola = 'Neerfearon a Dr Mundo papus :v';
    //this.array.push('Neerfearon a Dr Mundo papus :v');
   // this.img = !this.img;
   if(this.status === 'Fase1') {
      this.status = 'Fase2';
    }
    else if(this.status === 'Fase2') {
      this.status = 'Fase3';
    }
    else if(this.status === 'Fase3') {
      this.status = 'Fase4';
    }
    else {
      this.status = 'Fase1';  
    }
  }

  title = 'Adeu';

  

}
