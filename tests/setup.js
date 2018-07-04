jest.setTimeout(60000);

require('../models/User');

const mongooose = require('mongoose');
const keys = require('../config/keys');

mongooose.Promise = global.Promise;
mongooose.connect(keys.mongoURI, { useMongoClient: true });