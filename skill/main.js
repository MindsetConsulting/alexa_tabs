'use strict';

// Include the state machine module and the replyWith function
const _ = require('lodash');
const config = require('../config');
const Voxa = require('voxa');
const views = require('./views');
const variables = require('./variables');
const states = require('./states');
const Storage = require('../services/Storage');
const adapter = new Storage();

const skill = new Voxa({variables, views});

skill.onRequestStarted(loadUser);

skill.onUnhandledState(onUnhandledState);

skill.onBeforeReplySent(saveUserToDynamo);

states.register(skill);

/*******  plugins  *******/
Voxa.plugins.stateFlow(skill);

Voxa.plugins.autoLoad(skill, { adapter });


/*****  plugins end *****/
function loadUser(alexaEvent) {
  let loadStoragePromise = Promise.resolve(alexaEvent.model.user);

  if (_.isEmpty(alexaEvent.model.user)) {
    const store = new Storage(config.dynamoDB.tables.users);
    loadStoragePromise = store.get(alexaEvent.user);
  }

  return loadStoragePromise.then((userData) => {
    userData = userData || {};
    _.set(userData, 'userId', alexaEvent.user.userId);
    _.set(alexaEvent, 'model.user', userData);
  });
}

function saveUserToDynamo(alexaEvent) {
  const store = new Storage(config.dynamoDB.tables.users);
  delete alexaEvent.model.user.accessToken;

  return store.put(alexaEvent.model.user);
}

function saveLastReply(request, reply, transition) {
  request.session.attributes.reply = _.pickBy({
    reply: transition.reply,
    to: transition.to.name,
  });
}

function onUnhandledState(alexaEvent, reply) {
  if (alexaEvent.session.new) {
    return { to: 'LaunchIntent' };
  }

  // Close on negation/cancel/stop intents
  if (_.includes(['AMAZON.NoIntent'], alexaEvent.intent.name)) {
    return { to: 'exit' };
  }

  const lastReply = _.get(alexaEvent, 'session.attributes.reply.reply');
  reply = _.isArray(lastReply) ? _.last(lastReply) : lastReply;

  return {
    to: alexaEvent.session.attributes.reply.to,
    reply: _.concat('Error.UnknownIntent', reply),
  };
}

module.exports = skill;
