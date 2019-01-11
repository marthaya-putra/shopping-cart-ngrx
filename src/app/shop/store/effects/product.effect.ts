import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../../product/product.service';
import {GetProducts, GetProductsSuccess, ProductActionType} from '../actions/products.action';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Product} from '../../product/product.model';

@Injectable()
export class ProductEffect {
  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType<GetProducts>(ProductActionType.GetProducts),
    switchMap(() => this.productService.getProducts()),
    switchMap((products: Product[]) => of(new GetProductsSuccess(products)))
  );

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
