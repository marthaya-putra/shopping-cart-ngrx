import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {PromoCodeService} from '../../cart/promo-code.service';
import {ApplyPromoCode, CartActionType, GetPromoCode} from '../actions/cart.action';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {selectProductState} from '../selectors/product.selector';
import {selectCartState} from '../selectors/cart.selector';
import {of} from 'rxjs';

@Injectable()
export class CartEffect {

  @Effect()
  getPromoCode$ = this.actions$.pipe(
    ofType<GetPromoCode>(CartActionType.GetPromoCode),
    map(action => action.payload),
    switchMap((code) => this.promoCodeService.get(code)),
    withLatestFrom(this._store.pipe(select(selectProductState)), this._store.pipe(select(selectCartState))),
    switchMap(([promoRule, productState, cartState]) => of(
      new ApplyPromoCode(this.promoCodeService.validatePromo(promoRule, productState, cartState)))
    )
  );

  constructor(private actions$: Actions, private promoCodeService: PromoCodeService, private _store: Store<AppState>) {
  }
}
