import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion'
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../models/precios';
import { MensajesService } from '../services/mensajes.service'

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precios: Precio[] = new Array();
  precioSeleccionado: Precio = new Precio();
  nombreCliente: String;
  idPrecio: string = 'null'
  constructor(private db: AngularFirestore, private alert: MensajesService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((item => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio)
      }))
    })
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
    this.nombreCliente = `${cliente.nombre} ${cliente.apellido}`
  }

  eliminarCliente() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardarCliente() {
    if (this.inscripcion.isValid().isValid) {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precio: this.inscripcion.precio,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
      this.db.collection('inscripciones').add(inscripcionAgregar).then((res) => {
        this.inscripcion = new Inscripcion();
        this.clienteSeleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = "null";
        this.alert.mensajeSuccess("Guardado correctamente");
      }).catch(() => {
        this.alert.mensajeError("Ha ocurrido algún error")
      })
    }
    else {
      console.log(this.inscripcion.isValid().mensaje);
      this.alert.mensajeAdvertencia(this.inscripcion.isValid().mensaje)
    }
  }

  seleccionarPrecio(id: string) {
    this.precioSeleccionado = this.precios.find(x => x.id == id);
    if (id != "null") {
      this.inscripcion.precio = this.precioSeleccionado.ref;
      this.inscripcion.fecha = new Date();
      this.inscripcion.subTotal = this.precioSeleccionado.precio;
      this.inscripcion.iva = this.precioSeleccionado.precio * 0.21;
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva;

      if (this.precioSeleccionado.tipoDuracion == 1) {
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDay())
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 2) {
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDay() + 5)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 3) {
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDay() + 13)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.tipoDuracion == 4) {
        let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
        console.log(this.inscripcion.fecha.getMonth())
        let dia: number = this.inscripcion.fecha.getDay();
        let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth() + 1, dia - 1)
        this.inscripcion.fechaFinal = fechaFinal;
      }
    }

    else {
      this.precioSeleccionado = new Precio();
      this.inscripcion.precio = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }


}
