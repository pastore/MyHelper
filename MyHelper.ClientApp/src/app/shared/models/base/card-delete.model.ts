import { CardType } from '../../utilities/enums';

export class CardDeleteModel {
  constructor(
    public id: number,
    public name: string,
    public cardType: string) { }
}
