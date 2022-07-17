import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeComponent } from './cake/cake.component';
import { CakesListComponent } from './cakes-list/cakes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'cakes', pathMatch: 'full' },
  { path: 'cakes', component: CakesListComponent },
  { path: 'cakes/:id', component: CakeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
