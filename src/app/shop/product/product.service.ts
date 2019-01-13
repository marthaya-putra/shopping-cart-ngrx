import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from './product.model';

export const availableProducts = [
  {
    id: 'wf',
    name: 'Workflow',
    price: 199.99
  },
  {
    id: 'docgen',
    name: 'Document Generation',
    price: 9.99
  },
  {
    id: 'form',
    name: 'Form',
    price: 99.99
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  getProducts(): Observable<Product[]> {
    return of(availableProducts);
  }
}
