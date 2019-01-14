import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AcknowledgementComponent} from './shop/acknowledgement/acknowledgement.component';
import {ShopComponent} from './shop/shop.component';

const routes: Routes = [
  {path: 'shop', component: ShopComponent},
  {path: 'acknowledgement', component: AcknowledgementComponent},
  {path: '', redirectTo: '/shop', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
