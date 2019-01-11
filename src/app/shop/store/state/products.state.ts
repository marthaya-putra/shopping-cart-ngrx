import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Product} from '../../product/product.model';

export interface ProductsState extends EntityState<Product> {

}

export const adapter: EntityAdapter<Product>  = createEntityAdapter<Product>();

export const initialState = adapter.getInitialState();
