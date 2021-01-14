import { DocumentReference } from '@angular/fire/firestore';

export class Precio{
    id: string
    nombre: string;
    precio: number;
    duracion: number;
    tipoDuracion: number;
    ref: DocumentReference
}