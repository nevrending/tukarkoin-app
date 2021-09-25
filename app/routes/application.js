import Route from '@ember/routing/route';
import fetch from 'fetch';
import { later } from '@ember/runloop';
import { restartableTask, task, timeout } from 'ember-concurrency';

export default class IndexRoute extends Route {
  async fetchLatestTicker() {
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCAUD'
    );
    const ticker = await response.json();
    return { ticker };
  }

  async model() {
    let ticker = await this.fetchLatestTicker();
    return {
      taskInstance: ticker,
      // taskInstance: this.get('getLatestTicker').perform()
    };

    // Alt #0 - Test UI with dummy data
    // return [
    //   {
    //     symbol: 'BTCAUD',
    //     lastPrice: '57994.19000000',
    //     closeTime: 1632499209511
    //   }
    // ];

    // Alt #1 - Fetch
    // const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCAUD');
    // const ticker = await response.json();
    // return { ticker };

    // Alt #2 - try using interval
    // this.stopTime = (Date.now() / 1000) + 20;

    // let response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    // let ticker = await response.json();

    // let interval = setInterval(async () => {
    //   let newResult = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    //   let ticker = await newResult.json();
    //   // this.refresh();

    //   // if(newResult.unixtime > this.stopTime) {
    //   //   clearInterval(interval);
    //   // }
    // }, 5000);

    // this.set('interval', interval);
    // return { taskInstance: ticker };

    // Alt #3 - try using run.later
    // while (true) {
    //   return this.getLatestTicker();

    //   later(
    //     this,
    //     () => {
    //       return this.getLatestTicker();
    //     },
    //     2000
    //   );
    // }
  }

  // Alt #2 - try using interval
  // @action
  // willTransition() {
  //   let interval = this.get('interval');

  //   if(interval) {
  //     clearInterval(interval);
  //   }
  // }

  // Alt #4 - Ember Concurrency
  // setupController(controller, model) {
  //   super.setupController(...arguments);
  //   this.getLatestTicker.perform();
  // }

  // resetController() {
  //   super.resetController(...arguments);
  //   this.getLatestTicker.cancelAll();
  // }

  @restartableTask *getLatestTicker() {
    yield timeout(500);
    let ticker = yield this.fetchLatestTicker();

    while (true) {
      ticker = yield this.fetchLatestTicker();
      yield timeout(5000);
    }

    // return ticker;
  }
}
