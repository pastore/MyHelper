import { CardType } from '../../utilities/enums';

export interface ICard<T> {
  data: T;
  cardType: CardType;
}

export interface IFriendCard<T>
  extends ICard<T> {
    disabled: boolean;
    isReturn: boolean;
  }
