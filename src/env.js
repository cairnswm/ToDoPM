let TENANT = "https://cairnsgames.co.za/php/tenant/";
let AUTH = "https://cairnsgames.co.za/php/auth/";
let SETTINGS = "https://cairnsgames.co.za/php/settings/api.php/";
let CONTENT = "https://cairnsgames.co.za/php/content/";
let FILES = "https://cairnsgames.co.za/files/";
// let PAYWEB3 = "http://localhost/cairnsgames/php/payweb3/";
let PAYWEB3 = "http://cairnsgames.co.za/php/payweb3/";
let SUBSCRIPTIONS = "http://localhost/cairnsgames/php/subscriptions/";
// let SUBSCRIPTIONS = "http://cairnsgames.co.za/php/subscriptions/";

if (typeof process !== 'undefined' && process?.env) {
  TENANT = process.env.REACT_APP_TENANT_API;
  AUTH = process.env.REACT_APP_AUTH_API;
  SETTINGS = process.env.REACT_APP_SETTINGS_API;
  CONTENT = process.env.REACT_APP_CONTENT_API;
  FILES = process.env.REACT_APP_FILES;
  PAYWEB3 = process.env.REACT_APP_PAYWEB3_API;
  SUBSCRIPTIONS = process.env.REACT_APP_SUBSCRIPTIONS_API;
}

export const REACT_APP_TENANT_API = TENANT;
export const REACT_APP_AUTH_API = AUTH;
export const REACT_APP_SETTINGS_API = SETTINGS;
export const REACT_APP_CONTENT_API = CONTENT;
export const REACT_APP_FILES = FILES;
export const REACT_APP_PAYWEB3_API = PAYWEB3;
export const REACT_APP_SUBSCRIPTIONS_API = SUBSCRIPTIONS;
