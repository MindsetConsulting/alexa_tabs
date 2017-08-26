'use strict';

const _ = require('lodash');

exports.register = function register(skill) {
  skill.onIntent('LaunchIntent', () => ({reply: 'launch.welcome', to: 'entry'}));
  skill.onIntent('AMAZON.HelpIntent', () => ({reply: 'help.general', to: 'entry'}));
  skill.onIntent('TabPersonIntent', (alexaEvent) => {
    const person = _.get(alexaEvent, 'intent.params.person');
    const amount = _.get(alexaEvent, 'intent.params.amount', 0);

    alexaEvent.model.person = _.toLower(alexaEvent.model.person || person);
    alexaEvent.model.amount = _.toNumber(alexaEvent.model.amount || amount);

    if (_.isEmpty(alexaEvent.model.person)) {
      return ({reply: 'tab.askForName', to: 'entry'});
    }

    if (alexaEvent.model.amount <= 0) {
      return ({reply: 'tab.askForAmount', to: 'entry'});
    }

    let totalAmount = _.get(alexaEvent, `model.user.tabs.${alexaEvent.model.person}.amount`, 0);
    console.log('totalAmount', totalAmount, alexaEvent.model.amount);
    totalAmount = _.toNumber(totalAmount) || 0;
    totalAmount += alexaEvent.model.amount;

    _.set(alexaEvent, `model.user.tabs.${alexaEvent.model.person}.amount`, totalAmount)

    console.log('users', alexaEvent.model.user);
    return ({reply: 'tab.addToTab', to: 'clear'});
  });

  skill.onState('clear', (alexaEvent) => {
    _.unset(alexaEvent, 'model.person');
    _.unset(alexaEvent, 'model.amount');

    return ({ to: 'entry' })
  });
  skill.onIntent('TabStatusIntent', () => ({reply: 'tab.status', to: 'entry'}));
};
