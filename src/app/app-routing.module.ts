import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './components/prueba';
import { EjDosComponent } from './components/ejercicio2/ej2';

const routes: Routes = [
  {
    path: '',
    component: PruebaComponent
  },
  {
    path: 'formulario',
    component: EjDosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
