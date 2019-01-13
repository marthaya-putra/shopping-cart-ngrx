import {TestBed} from '@angular/core/testing';
import {CartEffect} from './cart.effect';
import {promoCodeDic, PromoCodeService} from '../../cart/promo-code.service';
import {provideMockActions} from '@ngrx/effects/testing';
import {Store, StoreModule} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {AddItemToCart, ApplyPromoCode, GetPromoCode} from '../actions/cart.action';
import {cold} from 'jasmine-marbles';
import {GetProductsSuccess} from '../actions/products.action';
import {of} from 'rxjs';
import {ShopTestingModule} from '../../shop.module.spec';

describe('CartEffect', () => {
  let effect: CartEffect;
  let promoService: any;
  let actions: any;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopTestingModule],
      providers: [
        provideMockActions(() => actions),
        {
          provide: PromoCodeService,
          useValue: jasmine.createSpyObj('promoService', ['get', 'validatePromo'])
        }
      ]
    });
    effect = TestBed.get(CartEffect);
    promoService = TestBed.get(PromoCodeService);
    store = TestBed.get(Store);
  });

  describe('getPromoCode$', () => {
    beforeEach(() => {
      store.dispatch(new GetProductsSuccess([
        {
          id: 'wf',
          name: 'Workflow',
          price: 100
        }
      ]));

      store.dispatch(new AddItemToCart(
        {
          productId: 'wf',
          quantity: 2
        }
      ));
    });
    const promoCode = 'RRD4D32';
    it('should dispatch expected ApplyPromoCode Action', () => {

      promoService.get.and.returnValue(of(promoCodeDic[promoCode]));
      promoService.validatePromo.and.returnValue(promoCodeDic[promoCode]);

      const action = new GetPromoCode(promoCode);
      const completion = new ApplyPromoCode(promoCodeDic[promoCode]);
      actions = cold('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effect.getPromoCode$).toBeObservable(expected);
    });
  });
});
