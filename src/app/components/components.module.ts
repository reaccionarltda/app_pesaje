import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrosComponent } from './registros/registros.component';
import { RegistroComponent } from './registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    RegistrosComponent,
    RegistroComponent,
    HeaderComponent
  ],
  exports: [
    RegistrosComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
