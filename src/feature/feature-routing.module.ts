import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpaceXProgramsComponent } from './components/space-x-programs/space-x-programs.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/spaceX',
    pathMatch: 'full'
  },
  {
    path: 'spaceX',
    component: SpaceXProgramsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
