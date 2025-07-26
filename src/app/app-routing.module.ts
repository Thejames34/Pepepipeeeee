import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './components/prueba';
import { EjDosComponent } from './components/ejercicio2/ej2';
import {crud} from './components/crud/crud'
import { loginComponent } from './components/login/login';
import { AboutComponent } from './components/about/about.component';
import { ReporteComponent } from './components/reporte/reporte';

const routes: Routes = [
  {
    path: 'formulario',
    component: EjDosComponent
  },
  {
    path:'Examen',
    component: crud
  },
  {
    path:'',
    component: PruebaComponent
  },
  {
    path:'login',
    component: loginComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'reporte',
    component: ReporteComponent
  }
  // Default route
  


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
