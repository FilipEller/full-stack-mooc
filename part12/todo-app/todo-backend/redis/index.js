const redis = require('redis');
const { promisify } = require('util');
const { REDIS_URL } = require('../util/config');

let getAsync;
let setAsync;

const redisIsDisabled = () => {
  console.log('No REDIS_URL set, Redis is disabled');
  return null;
};

if (!REDIS_URL) {
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  try {
    const client = redis.createClient({
      url: REDIS_URL,
    });
    console.log('redis client created');
    getAsync = promisify(client.get).bind(client);
    setAsync = promisify(client.set).bind(client);
  } catch (e) {
    getAsync = redisIsDisabled;
    setAsync = redisIsDisabled;
    console.log('error creating redis client:', e.message);
  }
}

module.exports = {
  getAsync,
  setAsync,
};
