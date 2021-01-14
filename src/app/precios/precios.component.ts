import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../models/precios'
import { remoteConfig } from 'firebase';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditar: Boolean = false;
  id: string = '';
  constructor(private fb: FormBuilder, private db: AngularFirestore, private alert: MensajesService) { }

  ngOnInit(): void {
    this.formularioPrecios = this.fb.group({
      nombre: ["", Validators.required],
      precio: ["", Validators.required],
      duracion: ["", Validators.required],
      tipoDuracion: ["", Validators.required]
    })
    this.mostrarPrecios()
  }

  mostrarPrecios() {
    this.db.collection<Precio>('precios').get().subscribe((resultado) => {
      this.precios.length = 0
      for (let item of resultado.docs) {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio)
      }
    })
  }

  agregar() {
    this.db.collection('precios').add(this.formularioPrecios.value).then(() => {
      this.alert.mensajeSuccess('Precio agregado correctamente')
    }).catch(() => {
      this.alert.mensajeError('Ocurrió un error');
      this.formularioPrecios.reset();
      this.mostrarPrecios();
    })
    console.log(this.formularioPrecios.value)
  }

  editarPrecio(precio: Precio) {
    this.formularioPrecios.setValue({
      nombre: precio.nombre,
      precio: precio.precio,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.esEditar = true;
    this.id = precio.id
  }

  editar() {
    this.db.doc('precios/' + this.id).update(this.formularioPrecios.value).then(() => {
      this.alert.mensajeSuccess('Precio editado correctamente');
      this.formularioPrecios.reset();
      this.esEditar = false;
      this.mostrarPrecios();
    }).catch(() => {
      this.alert.mensajeError('Ocurrió un error')
    })
  }

}
