import { Component, OnInit, Input } from '@angular/core';
import { Registro } from '../../interfaces/interfaces';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
})
export class RegistrosComponent implements OnInit {

  @Input() registros: Registro[] = [];

  constructor() { }

  ngOnInit() {
    console.log('rgsts: ', this.registros);
  }

}
