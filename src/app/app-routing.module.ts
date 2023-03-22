import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DetailComponent } from './detail/detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    
},
{
    path: 'about',
    component: AboutComponent,
    
},
{
  path: 'add',
  component: AddCustomerComponent,
  
},
{
  path: 'edit/:id',
  component: UpdateCustomerComponent,
  
},
{
    path: 'details/:id',
    component: DetailComponent,
    
},
{
  path: 'not-found',
  component: NotFoundComponent,
  
},
{
  path: '**',
  component: NotFoundComponent,
  
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
