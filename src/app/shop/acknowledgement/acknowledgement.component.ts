import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CartItem} from '../cart/cart-item.model';
import {AppState} from '../../store/app.state';
import {select, Store} from '@ngrx/store';
import {selectCartItems, selectFormattedProductsInCartString, selectGrandTotal, selectPromoRule} from '../store/selectors/cart.selector';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcknowledgementComponent implements OnInit {
  cartItems$ = this.store$.pipe(select(selectFormattedProductsInCartString));
  promo$ = this.store$.pipe(select(selectPromoRule));
  total$ = this.store$.pipe(select(selectGrandTotal));

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
  }

}

