import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrectos: Boolean = true;
  textoError: string = '';
  constructor(private fb: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.formularioLogin.valid){
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario) => { 
        console.log(usuario)
      }).catch((error) => {
        this.spinner.hide();
        this.datosCorrectos = false;
        this.textoError = error.message
      })
    } else {
      this.datosCorrectos = false
      this.textoError = 'Asegúrate de que los datos sean correctos'
    }
  }

}
