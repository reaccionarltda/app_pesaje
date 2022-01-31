import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdescarguePage } from './editdescargue.page';

const routes: Routes = [
  {
    path: '',
    component: EditdescarguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdescarguePageRoutingModule {}
