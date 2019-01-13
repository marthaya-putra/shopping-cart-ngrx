import {Component, Input, OnInit} from '@angular/core';
import {CartSummary} from '../cart-summary.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input()
  item: CartSummary;

  hasDiscount() {
    return this.item.finalPrice || this.item.finalPrice > 0;
  }
  constructor() { }

  ngOnInit() {
  }

}
