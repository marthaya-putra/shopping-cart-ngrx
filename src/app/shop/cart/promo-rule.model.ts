export enum Operator {
  GreaterThan,
  GreaterThanEq
}

export enum PromoType {
  OnProduct,
  TotalPrice
}

export interface Condition {
  operator: Operator;
  unit: number;
}

export interface PromoRule {
  code: string;
  type: PromoType;
  applicable: boolean;
  condition: Condition;
  onProduct?: {
    refProductId: string;
    onProductId: string;
    promoPrice: number;
  };
  onPrice?: {
    discountRate: number;
  };
}
