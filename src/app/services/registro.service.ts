/* eslint-disable no-underscore-dangle */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Registro } from '../interfaces/interfaces';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  nuevoRegistro = new EventEmitter<Registro>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private fileTransfer: FileTransfer) { }

  crearRegistro(registro) {

    let url = URL + '/apppesaje';
    url += '?token=' + this.usuarioService.token;

    return new Promise( resolve => {
      this.http.post(url, registro)
        .subscribe((resp: any)=>{
          this.nuevoRegistro.emit( resp.registro);
          resolve(true);
        });

    });
  }

  actualizarRegistro(registro) {

    let url = URL + '/apppesaje/';
    url += registro._id;
    url += '?token=' + this.usuarioService.token;

    return new Promise( resolve => {
      this.http.put(url, registro)
        .subscribe((resp: any)=>{
          this.nuevoRegistro.emit( resp.registro);
          resolve(true);
        });

    });
  }

  subirImagen( img: string, referencia: number ){
    const options: FileUploadOptions = {
      fileKey: 'image',
      params: {
        // eslint-disable-next-line quote-props
        'token': this.usuarioService.token
      },
      headers: {
        // eslint-disable-next-line quote-props
        'token': this.usuarioService.token
      }
    };

    return new Promise( (resolve, reject)=>{
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${ URL }/apppesaje/upload?token=${this.usuarioService.token}&referencia=${referencia}`, options)
        .then( data=>{
          console.log(data);
          resolve(data);
        }).catch( err => {
          console.log('Error en carga de imagen, err');
          reject( err);
        });
    });

  }
}
