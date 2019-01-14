import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {productsReducer} from './store/reducers/products.reducer';
import {ProductEffect} from './store/effects/product.effect';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import {CartEffect} from './store/effects/cart.effect';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import {cartReducer} from './store/reducers/cart.reducer';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, CartSummaryComponent,
    CartItemComponent, AcknowledgementComponent, ShopComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([ProductEffect, CartEffect])
  ],
  exports: [ProductListComponent, CartSummaryComponent, AcknowledgementComponent]
})
export class ShopModule { }
