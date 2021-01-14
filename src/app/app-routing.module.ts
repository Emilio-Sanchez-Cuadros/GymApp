import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionComponent } from './inscripcion/inscripcion.component'
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './precios/precios.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { VotacionJoseComponent } from './votacion-jose/votacion-jose.component'

const routes: Routes = [
  {
    path: '', redirectTo: 'inscripcion', pathMatch: 'full'
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-cliente', component: AgregarClienteComponent
  },
  {
    path: 'agregar-cliente/:id', component: AgregarClienteComponent
  },
  {
    path: 'precios', component: PreciosComponent
  },
  {
    path: 'listado-inscripciones', component: ListadoInscripcionesComponent
  },
  {
    path: 'votacion-jose', component: VotacionJoseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
