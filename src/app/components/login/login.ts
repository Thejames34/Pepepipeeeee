import { Component } from "@angular/core";
import { pelicula } from "src/app/estructuras/general";
import { Firestore, collection, collectionData, doc, query, setDoc, where, deleteDoc, orderBy } from "@angular/fire/firestore";
import { usuario } from "src/app/estructuras/usuario";
import { Route, Router } from "@angular/router";
import { alerts } from "src/app/plugins/alerts";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class loginComponent {
    public usuario: usuario;
    usuarioDB = collection(this.firestore, 'usuarios')

    constructor(private firestore: Firestore, private redirectio: Router){
        this.usuario = new usuario();
    }
    async login(){
        if(!this.validEmail() || !this.validPassword()){
            return;
        }
        const queryUsuario = query(
            this.usuarioDB, 
            where('email', '==', this.usuario.email), 
            where('password', '==', this.usuario.password)
        );
        collectionData(queryUsuario).subscribe(async(getUsuario) => {
            if(getUsuario.length > 0){
                this.usuario.id = getUsuario[0].id;
                this.usuario.name = getUsuario[0].name;
                this.usuario.lastName = getUsuario[0].lastName;
                this.usuario.userName = getUsuario[0].userName;
                
                // Guardar datos del usuario en localStorage
                const currentUser = {
                    id: this.usuario.id,
                    name: this.usuario.name,
                    lastName: this.usuario.lastName,
                    userName: this.usuario.userName,
                    email: this.usuario.email,
                    nombre: `${this.usuario.name} ${this.usuario.lastName}`
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                alerts.success('Bienvenido', `Hola ${this.usuario.name} ${this.usuario.lastName}`, 2000);
                setTimeout(() => {
                    this.redirectio.navigate(['/formulario'],{state: this.usuario})
                },2000);
                return;
            }
            return alerts.error('Usuario no encontrado', 'Por favor verifica tus credenciales');
        })
    }
    validEmail(){
        if(this.usuario.email === '' || null){
            alerts.error('Campo vacío', 'El campo email no puede estar vacío');
            return false;
        }
        return true;
    }
    validPassword(){
        if(this.usuario.password === '' || null){
            alerts.error('Campo vacío', 'El campo password no puede estar vacío');
            return false;
        }
        return true;
    }
}