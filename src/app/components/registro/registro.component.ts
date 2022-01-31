import { Component, OnInit, Input } from '@angular/core';
import { Registro } from '../../interfaces/interfaces';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  @Input() registro: Registro = {};

  constructor(private router: Router) { }

  editar() {
    const navigationExtras: NavigationExtras = {
      state: {
        registro: this.registro
      }
    };
    this.router.navigate(['/editdescargue'], navigationExtras);
  }

  ngOnInit() {
    console.log('Registro cargado: ', this.registro);
   }

}
