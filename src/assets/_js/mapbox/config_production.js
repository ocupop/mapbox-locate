// Reference: https://github.com/mapbox/www.mapbox.com/blob/mb-pages/src/data/config_production.js
/////////////

/* @flow */

// Must expose all the same properties as config_production.
// Must export a CommonJS module instead because of the way
// config.js conditionally requires this, and because it is
// used in bin/check-access-tokens.js

module.exports = {
  SENTRY_DSN: 'https://581913e6cd0845d785f5b551a4986b61@sentry.io/11290',
  APP_URL_ORIGIN: 'https://www.mapbox.com',
  API_URL_ORIGIN: 'https://api.mapbox.com',
  MAPBOX_ACCESS_TOKEN:
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
  SALESFORCE_WEBTOLEAD_URL:
    'https://login.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
  SALESFORCE_WEBTOLEAD_OID: '00D36000000HA1e'
};