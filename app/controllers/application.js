import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';

// export default class ApplicationController extends Controller {}

// I like to alias my model in the controller. Mainly `model` is too
// nondescript for me. In this case the use of an Object adds another level
// which would be a pain to use throughout the template code. An alias is best:
export default Controller.extend({
  isPolling: reads('model.taskResult.isRunning'),
  result: reads('model.taskResult.value'),
  error: reads('model.taskResult.error'),
});
