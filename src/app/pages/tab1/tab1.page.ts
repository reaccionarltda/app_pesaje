/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/services/registros.service';
import { RegistroService } from 'src/app/services/registro.service';
import { RespuestaRegistros, Registro } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  registros: Registro[] = [];
  habilitado = true;

  constructor(private registrosService: RegistrosService,
              private registroService: RegistroService) {}

  recargar( event? ) {
    this.siguientes ( event, true );
    this.habilitado = true;
      this.registros = [];
  }

  siguientes( event?, pull: boolean = false ){

    this.registrosService.obtenerRegistros( pull )
      .subscribe((resp: RespuestaRegistros)=> {
        // console.log(resp);
        this.registros.push(...resp.registros);

        if ( event ) {
          event.target.complete();
          if (resp.registros.length === 0) {
            this.habilitado = false;
          }
        }
      });
  }

  ngOnInit() {
    this.siguientes();
    this.registroService.nuevoRegistro
      .subscribe( registro => {
        // console.log('Emitido: ', registro);
        // this.registros.unshift( registro );
        this.recargar();
      });
  }


}
