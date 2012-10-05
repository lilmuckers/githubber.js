var GitHubAPI = require('./api.js');

exports.express = function(ghObj, autoAuth)
{
  return function(req, res, next)
  {
    //check if an access token is already on the request
    if(req.session.accessToken)
    {
      //if it is, just set up the API object and assign it to the request
      req.GitHub = new GitHubAPI(ghObj, req.session.accessToken);
      next();
    } else if(req.session.randomOAuthState) {
      //we've done the first step, but not the second
      ghObj.importResponse(req, function(err, response){
        if(err){
          throw Error('could not get access to Github, please contact an administrator');
        }
        req.session.accessToken = response.access_token;
        req.GitHub = new GitHubAPI(ghObj, req.session.accessToken);
        next();
      });
    } else {
      //we need to get crazy up in this hizzle.
      //step one: redirect the user to github for authorisation
      //get the auth URL
      var state = ghObj.getRandomState();
      var authUrl = ghObj.getAuthUrl(state);
      req.session.randomOAuthState = state;
      res.redirect(authUrl);
    }
  }
}
