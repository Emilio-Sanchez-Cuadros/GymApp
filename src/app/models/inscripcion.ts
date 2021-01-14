import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion {
    fecha: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    precio: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;

    constructor() {
        this.fecha = null;
        this.fechaFinal = null;
        this.cliente = this.cliente;
        this.precio = this.precio;
        this.subTotal = this.subTotal;
        this.iva = this.iva;
        this.total = this.total
    }

    isValid(): any {
        let respuesta = {
            isValid: false,
            mensaje: ""
        }

        if (this.fecha == null || this.fecha == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No tiene fecha de inicio";
            return respuesta
        }
        else if (this.fechaFinal == null || this.fechaFinal == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No tiene fecha de finalización";
            return respuesta
        }
        else if (this.cliente == null || this.cliente == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "Seleccione un cliente";
            return respuesta
        }
        else if (this.precio == null || this.precio == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No ha seleccionado un precio";
            return respuesta
        }
        else if (this.subTotal <= 0 || this.subTotal == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No se ha podido calcular el subtotal";
            return respuesta
        }
        else if (this.iva <= 0 || this.iva == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No se ha podido calcular el IVA";
            return respuesta
        }
        else if (this.total <= 0 || this.total == undefined) {
            respuesta.isValid = false;
            respuesta.mensaje = "No se ha podido calcular el total";
            return respuesta
        }
        else {
            respuesta.isValid = true;
            return respuesta;
        }
    }
}