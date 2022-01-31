import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
import { Camera,  CameraOptions } from '@ionic-native/camera/ngx';
import { Registro } from 'src/app/models/registro.model';
import { UiServiceService } from '../../services/ui-service.service';
import { PhotoService } from '../../services/photo.service';



declare let window: any;
@Component({
  selector: 'app-editdescargue',
  templateUrl: './editdescargue.page.html',
  styleUrls: ['./editdescargue.page.scss'],
})
export class EditdescarguePage implements OnInit {
  status: any;
  registro: Registro;
  tempImages = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private uiService: UiServiceService,
              private registroService: RegistroService,
              private camera: Camera,
              private fotoService: PhotoService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const data = this.router.getCurrentNavigation().extras.state.registro;
        this.registro = data;
      }
    });
   }


   async actualizar(){
    this.registro.conductor = this.registro.conductor.toUpperCase();
    this.registro.placa = this.registro.placa.toUpperCase();
    if (this.registro.procedencia){
      this.registro.procedencia = this.registro.procedencia.toUpperCase();
    }
    if (this.registro.pesoCargado && this.registro.pesoDescargado){
      this.registro.diferencia = this.registro.pesoCargado - this.registro.pesoDescargado;
    }
    const actualizado = await this.registroService.actualizarRegistro(this.registro);
    if (actualizado){
        this.uiService.alertaInformativa('Registro actualizado!');
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
        this.router.navigateByUrl('main/tabs/tab1');
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


      // const options: CameraOptions = {
      //   quality: 60,
      //   destinationType: this.camera.DestinationType.FILE_URI,
      //   encodingType: this.camera.EncodingType.JPEG,
      //   mediaType: this.camera.MediaType.PICTURE,
      //   correctOrientation: true,
      //   sourceType: this.camera.PictureSourceType.CAMERA
      // };

      // try {
      //   this.camera.getPicture(options).then((imageData) => {
      //     const img = window.Ionic.WebView.convertFileSrc(imageData);
      //     this.status = imageData;
      //     this.registroService.subirImagen(imageData, this.registro.referencia)
      //       .then((data)=>{
      //         // this.status = JSON.stringify(data);
      //       }).catch((err)=>{
      //         this.status = JSON.stringify(err);
      //         this.uiService.alertaInformativa('Error subiendo foto');
      //       });
      //     this.tempImages.push( img );
      //   }, (err) => {
      //    // Handle error
      //    this.uiService.alertaInformativa('Error subiendo foto');
      //   //  this.status = JSON.stringify(err);
      //   });
      // } catch (error) {
      //   this.status = error;
      // }
    }





  ngOnInit() {
    console.log('Registro en edit registro: ', this.registro);
  }

}
