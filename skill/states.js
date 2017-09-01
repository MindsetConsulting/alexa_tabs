'use strict';

const _ = require('lodash');

exports.register = function register(skill) {
  skill.onIntent('LaunchIntent', () => ({reply: 'launch.welcome', to: 'entry'}));
  skill.onIntent('AMAZON.HelpIntent', () => ({reply: 'help.general', to: 'entry'}));
  skill.onIntent('TabPersonIntent', (alexaEvent) => {
    if (alexaEvent.intent.name === 'TabStatusIntent') return ({ to: 'TabStatusIntent' });

    const person = _.get(alexaEvent, 'intent.params.person');
    const amount = _.get(alexaEvent, 'intent.params.amount', 0);

    alexaEvent.model.person = _.toLower(alexaEvent.model.person || person);
    alexaEvent.model.person = _.replace(alexaEvent.model.person, '\'s', '');
    alexaEvent.model.amount = _.toNumber(alexaEvent.model.amount || amount);

    if (_.isEmpty(alexaEvent.model.person)) {
      return ({reply: 'tab.askForName', to: 'TabPersonIntent'});
    }

    if (alexaEvent.model.amount <= 0) {
      return ({reply: 'tab.askForAmount', to: 'TabPersonIntent'});
    }

    let totalAmount = _.get(alexaEvent, `model.user.tabs.${alexaEvent.model.person}.amount`, 0);
    // console.log('totalAmount', totalAmount, alexaEvent.model.amount);
    totalAmount = _.toNumber(totalAmount) || 0;
    totalAmount += alexaEvent.model.amount;

    _.set(alexaEvent, `model.user.tabs.${alexaEvent.model.person}.amount`, totalAmount)

    console.log('users', alexaEvent.model.user);
    return ({reply: 'tab.addToTab', to: 'clear'});
  });

  skill.onIntent('TabStatusIntent', (alexaEvent) => {
    if (alexaEvent.intent.name === 'TabPersonIntent') ({ to: 'TabPersonIntent' });

    const person = _.get(alexaEvent, 'intent.params.person');

    alexaEvent.model.person = _.toLower(alexaEvent.model.person || person);
    alexaEvent.model.person = _.replace(alexaEvent.model.person, '\'s', '');

    if (_.isEmpty(person)) {
      return ({reply: 'tab.askForNameOnStatus', to: 'entry'});
    }

    let totalAmount = _.get(alexaEvent, `model.user.tabs.${alexaEvent.model.person}.amount`, 0);
    totalAmount = _.toNumber(totalAmount) || 0;

    alexaEvent.model.amount = _.toNumber(alexaEvent.model.amount || totalAmount);

    if (alexaEvent.model.amount <= 0) {
      return ({reply: 'tab.statusNoAmount', to: 'clear'});
    }
    return ({reply: 'tab.status', to: 'entry'})
  });

  skill.onState('clear', (alexaEvent) => {
    _.unset(alexaEvent, 'model.person');
    _.unset(alexaEvent, 'model.amount');

    return ({ to: 'entry' })
  });

  skill.onIntent('AMAZON.RepeatIntent', (alexaEvent) => {
    if (alexaEvent.session.new) {
      return { to: 'LaunchIntent' };
    }

    return alexaEvent.session.attributes.reply;
  });

  skill.onIntent('AMAZON.CancelIntent', () => ({ to: 'exit' }));
  skill.onIntent('AMAZON.StopIntent', () => ({ to: 'exit' }));
  skill.onIntent('AMAZON.NoIntent', () => ({ to: 'exit' }));
  skill.onIntent('AMAZON.YesIntent', () => ({ to: 'AMAZON.HelpIntent' }));
  skill.onState('exit', (alexaEvent) => ({ reply: 'exit.general' }));
};
