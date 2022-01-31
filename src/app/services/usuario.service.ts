/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  _storage: Storage | null = null;
  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage) { this.init();}

    login(email: string, password: string) {
      const data = { email, password };

      return new Promise(resolve=>{
        this.http.post(`${URL}/login`, data)
          .subscribe((resp: any) => {
            console.log(resp);
            if (resp.ok){
              this.guardarToken( resp.token);
              resolve({ok:true, msg: 'login correcto'});
            } else {
              this.token = null;
              this._storage.clear();
              resolve({ok: false, msg: 'Error en login'});
            }
          }, (err)=>{this.token = null; this._storage.clear(); resolve({ok: false, msg: 'Por favor revise su conexión'});});
      });
    }

    async guardarToken( token: string ){
      this.token = token;
      await this._storage.set('token', token);
    }

    async init(){
      const storage = await this.storage.create();
      this._storage = storage;
    }
}
