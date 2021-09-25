import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MarketComponent extends Component {
  @tracked symbol = '';
  @tracked lastPrice = '';
  @tracked closeTime = 0;
}
