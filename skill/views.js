'use strict';

const config = require('../config');
const _ = require('lodash');

const views = {
  // LaunchIntent
  'launch.welcome.ask': 'Hi welcome to tab control. You can create a tab or consult existing tabs. How can i help you today?',
  'launch.welcome.reprompt': 'How may i help you today?',

  // Trivia Intent
  'help.general.ask': 'Tab control will help you manage all your tabs. You can say things like. Alexa, add $5 to Ava\'s tab or Alexa, What is Ava\'s tabs',
  'help.general.reprompt': 'What i can do for you?',

  'tab.addToTab.ask': 'Great, i added ${amount} to {person}\'s tabs. Is there something else i can help you with?',
  'tab.addToTab.reprompt': 'Is there something else i can help you with?',

  'tab.askForName.ask': 'Please specify a name.',
  'tab.askForName.reprompt': 'please provide a name so i can create a new tab or add to an existing tab',

  'tab.askForAmount.ask': 'Tell me the amount you want to add',
  'tab.askForAmount.reprompt': 'Please tell me how much you are going to add to that tab',

  'tab.askForNameOnStatus.ask': 'Please specify a name.',
  'tab.askForNameOnStatus.reprompt': 'Tell me which tab you want to check',

  'tab.statusNoAmount.ask': 'i\'m sorry but this tab is empty. Is there something else i can help you with?',
  'tab.statusNoAmount.reprompt': 'Is there something else i can help you with?',

  'tab.status.ask': 'Let\'s see. {person}\'s tab is ${amount}. Is there something else i can help you with?',
  'tab.status.repromt': 'Is there something else i can help you with?',
};

// Compile views
const compileViews = {};
_.each(views, (value, key) => { _.set(compileViews, key, value); });

module.exports = compileViews;
