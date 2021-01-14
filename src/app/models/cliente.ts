import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: Date;
    fotoUrl: string;
    tlf: number;
    ref: DocumentReference;
    visible: Boolean;

    constructor(){}
}