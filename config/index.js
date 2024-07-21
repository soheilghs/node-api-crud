const database = require('./database');
const session = require('./session');
const service = require('./service');

module.exports = {
  database,
  session,
  service,
  port: process.env.APPLICATION_PORT,
  cookie_secretkey: process.env.COOKIE_SECRETKEY,
  debug: true,
  site_url: process.env.WEBSITE_URL,
  jwt: {
    secret_key: 'fgsdget#r%!@#$qeg'
  }
};