import { CardType } from './card-type';

export interface ICard<T> {
  data: T;
  cardType: CardType;
}
