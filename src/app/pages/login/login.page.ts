import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  status: any;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

loginUser = {
  email: 'fredyinstr@gmail.com',
  password: '3ncR34cc'
};

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm) {
    console.log(fLogin.valid);
    console.log(this.loginUser);

    if ( fLogin.invalid ) { return; };

    const valido: any = await this.usuarioService.login( this.loginUser.email, this.loginUser.password);
    if (valido.ok){
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      // alerta de usuario y contraseña no válidos
      this.status = JSON.stringify(valido.msg);
      this.uiService.alertaInformativa('Error: '+this.status);
      console.log(this.status);
    }
  }

}
