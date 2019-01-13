import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './shop/product/product-list/product-list.component';
import {CartSummaryComponent} from './shop/cart/cart-summary/cart-summary.component';
import {AcknowledgementComponent} from './shop/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'summary', component: CartSummaryComponent},
  {path: 'acknowledgement', component: AcknowledgementComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
