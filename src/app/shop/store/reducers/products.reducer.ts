import {adapter, initialState, ProductsState} from '../state/products.state';
import {ProductAction, ProductActionType} from '../actions/products.action';


export const productsReducer = (state = initialState, action: ProductAction): ProductsState => {
  switch (action.type) {
    case ProductActionType.GetProductsSuccess : {
      return adapter.addAll(action.payload, state);
    }

    default:
      return state;
  }
};
