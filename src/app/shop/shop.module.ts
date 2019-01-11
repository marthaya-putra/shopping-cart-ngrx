import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {productsReducer} from './store/reducers/products.reducer';
import {ProductEffect} from './store/effects/product.effect';
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductEffect])
  ],
  exports: [ProductListComponent]
})
export class ShopModule { }
