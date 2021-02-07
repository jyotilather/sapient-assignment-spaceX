import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { SpaceXProgramsComponent } from './components/space-x-programs/space-x-programs.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SpaceXProgramsComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    RouterModule,
  ]
})
export class FeatureModule { }
