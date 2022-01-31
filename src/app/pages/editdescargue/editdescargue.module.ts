import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdescarguePageRoutingModule } from './editdescargue-routing.module';

import { EditdescarguePage } from './editdescargue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdescarguePageRoutingModule
  ],
  declarations: [EditdescarguePage]
})
export class EditdescarguePageModule {}
