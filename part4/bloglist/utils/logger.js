const colors = require('colors'); // eslint-disable-line

const success = (...params) => {
  console.log(...params.map(s => s.green));
};

const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params.map(s => s.red));
};

module.exports = { success, info, error };
