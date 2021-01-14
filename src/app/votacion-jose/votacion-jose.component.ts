import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votacion-jose',
  templateUrl: './votacion-jose.component.html',
  styleUrls: ['./votacion-jose.component.scss']
})
export class VotacionJoseComponent implements OnInit {
  votacionSi: Array<string> = new Array();
  votacionNo = new Array();
  haVotado: boolean = false;
  botonPulsado: boolean = false;
  votoId: number = 0;
  votos = new Array();
  names = ["Jose", "Samu", "Emo", "Rob", "Aman", "Juan"]
  constructor() { }

  ngOnInit(): void {
  }

  votaSi(name: string) {
    this.votacionSi.push(name);
    this.votos.push(name);
    const found = this.votacionSi.find(element => element == name);
    const nameFound = this.votos.find((nameFound1) => name == nameFound1);
    console.log(this.votos)
    if (found && nameFound) {
      this.haVotado = true
    }
  }

  votaNo(name: string) {
    this.votacionNo.push(name);
    this.votos.push(name);
    const found = this.votacionNo.find(element => element == name);
    const nameFound = this.votos.find((nameFound1) => name == nameFound1);
    console.log(this.votos)
    if (found && nameFound) {
      this.haVotado = true
    }
  }

}
