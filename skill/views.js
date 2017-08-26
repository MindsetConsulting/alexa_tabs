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

  'tab.status.ask': 'Let\'s see you have $7. can i help you with something else?',
  'tab.status.repromt': 'can i help you with something else?',
};

// Compile views
const compileViews = {};
_.each(views, (value, key) => { _.set(compileViews, key, value); });

module.exports = compileViews;
