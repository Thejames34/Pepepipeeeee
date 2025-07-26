import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  PruebaComponent } from './components/prueba';
import { EjDosComponent } from './components/ejercicio2/ej2';
import { crud } from './components/crud/crud';
import { loginComponent } from './components/login/login';
import { NavbarComponent } from './components/navbar/navbar';
import { AboutComponent } from './components/about/about.component';
import { ReporteComponent } from './components/reporte/reporte';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    EjDosComponent,
    crud,
    loginComponent,
    NavbarComponent,
    AboutComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
