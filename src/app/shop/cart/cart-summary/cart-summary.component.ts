import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {
  selectCartSummaryList,
  selectGrandTotalPreDiscount,
  selectGrandTotal,
  selectTotalDiscount
} from '../../store/selectors/cart.selector';
import {GetPromoCode} from '../../store/actions/cart.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent implements OnInit {

  cartSummaryList$ = this.store$.select(selectCartSummaryList);
  totalPreDiscount$ = this.store$.select(selectGrandTotalPreDiscount);
  totalDiscount$ = this.store$.select(selectTotalDiscount);
  grandTotal$ = this.store$.select(selectGrandTotal);

  constructor(private store$: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
  }

  applyPromoCode(value: string) {
    this.store$.dispatch(new GetPromoCode(value));
  }

  continue() {
    this.router.navigate(['acknowledgement']);
  }
}
