import Model, { attr } from '@ember-data/model';

export default class TickerModel extends Model {
  @attr('string') symbol;
  @attr('string') lastPrice;
  @attr('number') closeTime;
}
