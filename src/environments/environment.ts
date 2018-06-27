// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // remote:  'http://127.0.0.1:5984/'
  REMOTE: 'http://18.207.119.5:5984',
  EXCHANGE_URL:'https://forex.1forge.com/1.0.3/convert',
  EXCHANGE_KEY:'B4iPfrXe1zhe8qfnAP7S0uISRSUuWWCA'
};
