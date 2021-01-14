import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeSuccess(titulo: string){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    })
  }

  mensajeError(titulo: string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    })
  }

  mensajeAdvertencia(titulo: string){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
