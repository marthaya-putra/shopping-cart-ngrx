import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input()
  products: Product[];

  @Output()
  quantityChanged = new EventEmitter<{ productId: string, quantity: number }>();

  constructor() {
  }

  ngOnInit() {
  }

  onQuantityChanged(product: Product, $event: any) {
    this.quantityChanged.emit({productId: product.id, quantity: +$event.target.value});
  }
}
