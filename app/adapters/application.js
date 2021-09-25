import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api/v1';
  host = 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCAUD';
}
