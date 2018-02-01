import { CardType } from '../../utilities/enums';

export interface ICard<T> {
  data: T;
  cardType: CardType;
}
