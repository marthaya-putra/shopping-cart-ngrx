import {adapter, ProductsState} from '../state/products.state';
import {createFeatureSelector} from '@ngrx/store';

export const selectProductState = createFeatureSelector<ProductsState>('products');
const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors(selectProductState);

export const selectProducts = selectAll;
