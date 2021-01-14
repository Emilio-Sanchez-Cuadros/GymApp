import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MensajesService } from './services/mensajes.service';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { VotacionJoseComponent } from './votacion-jose/votacion-jose.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListadoInscripcionesComponent,
    VotacionJoseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ProgressbarModule.forRoot(),
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
