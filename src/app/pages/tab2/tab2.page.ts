import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';
import { PhotoService } from '../../services/photo.service';


declare let window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  status: any;
  tempImages: string[]=[];
  registro = {
    tipo: '',
    horaLlegada: null,
    conductor: '',
    placa: '',
    procedencia: '',
    destino: '',
    pesoOrigen: null,
    bultos: null,
    novedadLlegada: '',
    horaCargado: null,
    pesoCargado: null,
    novedadCargado: '',
    horaDescargado: null,
    pesoDescargado: null,
    novedadDescargado: '',
    diferencia: 0,
    referencia: new Date().getTime()
  };

  constructor(private registroService: RegistroService,
              private uiService: UiServiceService,
              private camera: Camera,
              private route: Router,
              private fotoService: PhotoService) {}

  async guardar(){
    this.registro.conductor = this.registro.conductor.toUpperCase();
    this.registro.placa = this.registro.placa.toUpperCase();
    this.registro.procedencia = this.registro.procedencia.toUpperCase();
    if (this.registro.pesoCargado && this.registro.pesoDescargado){
      this.registro.diferencia = this.registro.pesoCargado - this.registro.pesoDescargado;
    }
    const creado = await this.registroService.crearRegistro(this.registro);
    if (creado){
        console.log('Registro guardado');
        this.registro.tipo = '';
        this.registro.horaLlegada= null;
        this.registro.conductor= '';
        this.registro.placa= '';
        this.registro.procedencia= '';
        this.registro.destino= '';
        this.registro.pesoOrigen= null;
        this.registro.bultos= null;
        this.registro.novedadLlegada= '';
        this.registro.horaCargado= null;
        this.registro.pesoCargado= null;
        this.registro.novedadCargado= '';
        this.registro.horaDescargado= null;
        this.registro.pesoDescargado= null;
        this.registro.novedadDescargado= '';
        this.registro.diferencia= 0;
        this.registro.referencia= new Date().getTime();
        this.tempImages = [];
        this.route.navigateByUrl('main/tabs/tab1');
      };
    }

    async tomarFoto(){
      const imageData = await this.fotoService.capturarFoto();
      this.status = JSON.stringify(imageData);
      // this.uiService.alertaInformativa(this.status);
      // const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.registroService.subirImagen(imageData.path, this.registro.referencia)
            .then((data)=>{
              this.status = JSON.stringify(data);
            }).catch((err)=>{
              this.status = JSON.stringify(err);
              this.uiService.alertaInformativa('Error subiendo foto');
            });
      const img = imageData.webPath;
      this.tempImages.push( img );
    }

  ngOnInit(){
  }

}

