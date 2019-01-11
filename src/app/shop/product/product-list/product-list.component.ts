import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {GetProducts} from '../../store/actions/products.action';
import {selectProducts} from '../../store/selectors/product.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  products$ = this.store$.pipe(select(selectProducts));

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(new GetProducts());
  }

}
