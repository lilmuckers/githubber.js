var GitHubAPI = require('./api.js').GitHubAPI;

exports.express = function(ghObj, autoAuth)
{
  return function(req, res, next)
  {
    //check if an access token is already on the request
    if(req.session.accessToken)
    {
      //if it is, just set up the API object and assign it to the request
      req.gitHub = new GitHubAPI(req.session.accessToken);
    } else if(req.session.randomOAuthState) {
      //we've done the first step, but not the second
      ghObj
    } else {
      //we need to get crazy up in this hizzle.
      //step one: redirect the user to github for authorisation
      //get the auth URL
      var state = ghObj.getRandomState();
      var authUrl = ghObj.getAuthUrl(state);
      //req.session.randomOAuthState = state;
      
      console.log(authUrl);
    }
  }
}
