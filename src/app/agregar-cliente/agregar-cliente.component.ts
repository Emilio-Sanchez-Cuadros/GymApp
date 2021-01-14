import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../services/mensajes.service'

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImg: string = '';
  cliente: any = [];
  esEditable: boolean = false;
  clientId: string = ''
  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private alert: MensajesService) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      fechaNacimiento: ['', Validators.required],
      tlf: [''],
      fotoUrl: ['', Validators.required]
    })

    this.clientId = this.activeRoute.snapshot.params.id;
    if (this.clientId != undefined) {
      this.esEditable = true
      this.db.doc<any>('clientes/' + this.clientId).valueChanges().subscribe((cliente) => {
        this.cliente = cliente
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
          tlf: cliente.tlf,
          fotoUrl: ''
        })
        this.urlImg = cliente.fotoUrl
      });
    }
  }

  guardar() {
    this.formularioCliente.value.fotoUrl = this.urlImg;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => {
      console.log('Cliente guardado')
    })
    this.formularioCliente.reset();
    this.alert.mensajeSuccess('Cliente agregado correctamente')
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileExtension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = `clientes/${Date.now() + fileExtension}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then(() => {
        ref.getDownloadURL().subscribe((url) => {
          this.urlImg = url
        })
      })
      task.percentageChanges().subscribe((porcentajeSubida) => {
        this.porcentajeSubida = parseInt(porcentajeSubida.toString())
      })
    }
  }

  actualizar() {
    this.formularioCliente.value.fotoUrl = this.urlImg;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.doc('clientes/' + this.clientId).update(this.formularioCliente.value).then(() => console.log('actualizado'));
    this.db.doc<any>('clientes/' + this.clientId).valueChanges().subscribe((cliente) => {
      this.cliente = cliente
      this.formularioCliente.setValue({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
        tlf: cliente.tlf,
        fotoUrl: ''
      })
      this.urlImg = cliente.fotoUrl
    });
    this.alert.mensajeSuccess('Cliente actualizado correctamente')
  }
}
