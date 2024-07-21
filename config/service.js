module.exports = {
  recaptcha: {
    client_key: process.env.RECAPTCHA_CLIENTKEY,
    secret_key: process.env.RECAPTCHA_SECRETKEY,
    options: {
      hl: 'fa'
    }
  },
  google: {
    client_key: process.env.GOOGLE_CLIENTKEY,
    secret_key: process.env.GOOGLE_SECRETKEY,
    callback_url: process.env.GOOGLE_CALLBACKURL
  }
};