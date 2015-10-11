//var gapi = 
//require('../../lib/gapi/client');

var clientId = '694141446922-doq6g7ibrq3kpmgc0gejp28u1kaoa6dc.apps.googleusercontent.com';

var apiKey = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';

var scopes = 'https://www.googleapis.com/auth/drive';
// [
//       // whatever scopes you need for your app, for example:

//       'https://www.googleapis.com/auth/drive',
//       //'https://www.googleapis.com/auth/youtube',
//       //'https://www.googleapis.com/auth/userinfo.profile'
//       // ...
//     ];

// function handleAuthResult(authResult) {
//   console.log('authResult:'+authResult);
//  if (authResult && !authResult.error) {
//   //Auth OK
//  } else {
//    gapi.auth.authorize({ 
//     'client_id': clientId,
//     'scope': scopes,
//     'immediate': false
//   }, handleAuthResult); 
//  }
// }
function handleAuthResult(authResult) {
  console.log('authResult:'+authResult);
}

var checkAuth = function () {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

var initApi = function () {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

window.handleGapiClientLoad = function () {
  initApi();
}

module.exports = function () {
 initApi();
  
}