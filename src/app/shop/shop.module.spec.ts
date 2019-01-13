import {NgModule} from '@angular/core';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {CartSummaryComponent} from './cart/cart-summary/cart-summary.component';
import {CartItemComponent} from './cart/cart-item/cart-item.component';
import {AcknowledgementComponent} from './acknowledgement/acknowledgement.component';
import {combineReducers, StoreModule} from '@ngrx/store';
import {appReducers} from '../store/app.reducer';
import {cartReducer} from './store/reducers/cart.reducer';
import {productsReducer} from './store/reducers/products.reducer';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {CartEffect} from './store/effects/cart.effect';
import {ProductEffect} from './store/effects/product.effect';
import {PromoCodeService} from './cart/promo-code.service';
import {ProductService} from './product/product.service';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, CartSummaryComponent,
    CartItemComponent, AcknowledgementComponent],
  imports: [
    CommonModule,
    RouterTestingModule.withRoutes([]),
    StoreModule.forRoot(
      {
        ...appReducers,
        feature: combineReducers(productsReducer, cartReducer),
      }),
    EffectsModule.forRoot([CartEffect, ProductEffect])
  ],
  providers: [ProductService, PromoCodeService]
})

export class ShopTestingModule {
}
