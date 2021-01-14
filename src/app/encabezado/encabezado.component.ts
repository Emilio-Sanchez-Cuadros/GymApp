import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  usuario: User;
  constructor(private auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut();
    this.spinner.hide();
  }

}
