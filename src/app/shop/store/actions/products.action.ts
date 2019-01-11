import {Action} from '@ngrx/store';
import {Product} from '../../product/product.model';

export enum ProductActionType {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success'
}

export class GetProducts implements Action {
  readonly type = ProductActionType.GetProducts;
}

export class GetProductsSuccess implements Action {
  readonly type = ProductActionType.GetProductsSuccess;

  constructor(public payload: Product[]) {
  }
}

export type ProductAction = GetProducts | GetProductsSuccess;
