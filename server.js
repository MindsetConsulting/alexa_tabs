'use strict';

const skill = require('./skill/main');
const config = require('./config');

skill.startServer(config.server.port);
