import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  paginaRegistros = 0;


  constructor(private http: HttpClient) { }

  obtenerRegistros( pull: boolean = false) {

    if (pull) {
      this.paginaRegistros = 0;
    }
    this.paginaRegistros ++;
    return this.http.get(`${ URL }/apppesaje/?pagina=${ this.paginaRegistros}`);
  }
}
