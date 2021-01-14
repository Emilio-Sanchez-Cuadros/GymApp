import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = new Array();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((resultado) => {
      resultado.forEach((inscripcion => {
        let inscripcionFromDb = inscripcion.data();
        inscripcionFromDb.id = inscripcion.id;

        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente) => {
          console.log(cliente.data());
          inscripcionFromDb.clienteObtenido = cliente.data();
          inscripcionFromDb.fecha = new Date(inscripcionFromDb.fecha.seconds * 1000);
          inscripcionFromDb.fechaFinal = new Date(inscripcionFromDb.fechaFinal.seconds * 1000);
          this.inscripciones.push(inscripcionFromDb)
          console.log(this.inscripciones)
        })
      }))
    })
  }

}
