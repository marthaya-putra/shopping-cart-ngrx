import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {GetProducts} from '../../store/actions/products.action';
import {selectProducts} from '../../store/selectors/product.selector';
import {AddItemToCart, RemoveItemFromCart} from '../../store/actions/cart.action';
import {Router} from '@angular/router';
import {selectIsCartEmpty} from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  products$ = this.store$.pipe(select(selectProducts));
  isCartEmpty$ = this.store$.pipe(select(selectIsCartEmpty));

  constructor(private store$: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    this.store$.dispatch(new GetProducts());
  }

  quantityChanged($event: { productId: string; quantity: number }) {
    if ($event.quantity === 0) {
      this.store$.dispatch(new RemoveItemFromCart($event.productId));
      return;
    }
    this.store$.dispatch(new AddItemToCart($event));
  }

  goToSummaryPage() {
    this.router.navigate(['summary']);
  }
}
