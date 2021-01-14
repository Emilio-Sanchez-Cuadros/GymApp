import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente'

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();// Sirve para pasar datos al componente padre a través de un evento
  @Output('canceloCliente') canceloCliente = new EventEmitter();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((clientes) => {
      this.clientes.length = 0;
      for (let item of clientes.docs) {
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente)
      }})
  }

  buscarCliente(nombre: string) {
    this.clientes.forEach((cliente) => {
      if (cliente.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        cliente.visible = true
      } else {
        cliente.visible = false
      }
    })
  }

  seleccionarCliente(cliente: Cliente) {
    this.clientes.forEach((cliente) => {
      cliente.visible = false;
    })
    this.seleccionoCliente.emit(cliente);
  }

  cancelarCliente() {
    this.nombre = undefined;
    this.canceloCliente.emit();
  }

}
