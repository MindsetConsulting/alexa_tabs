'use strict';

const config = require('../config');
const _ = require('lodash');

const views = {
  // LaunchIntent
  'launch.welcome.ask': 'Hi welcome. can i help you?',
  'launch.welcome.reprompt': 'Can i help you?',

  // Trivia Intent
  'help.general.ask': 'help. can i help you?',
  'help.general.reprompt': 'can i help you?',

  'tab.addToTab.ask': 'Great, i added ${amount} to {person}\'s tabs. Can i help you with something else?',
  'tab.addToTab.reprompt': 'can i help you with something else?',

  'tab.askForName.ask': 'i need a name. do you want to add more?',
  'tab.askForName.reprompt': 'please provide a name',

  'tab.askForAmount.ask': 'i need the amount. do you want to add more?',
  'tab.askForAmount.reprompt': 'please tell how much',

  'tab.askForNameOnStatus.ask': 'i need a name. please specify a name',
  'tab.askForNameOnStatus.reprompt': 'please specify a name',

  'tab.statusNoAmount.ask': 'Tab is empty. Is there something else i can help you with?',
  'tab.statusNoAmount.reprompt': 'Is there something else i can help you with?',

  'tab.status.ask': 'Let\'s see. {person}\'s tab is ${amount}. can i help you with something else?',
  'tab.status.repromt': 'can i help you with something else?',
};

// Compile views
const compileViews = {};
_.each(views, (value, key) => { _.set(compileViews, key, value); });

module.exports = compileViews;
