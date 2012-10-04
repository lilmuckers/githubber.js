var querystring	= require('querystring'),
  crypto = require('crypto'),
	https 	= require('https');
	
	
function GitHub(client_id, secret, scope, callbackUrl)
{
  this.client_id = client_id;
  this.secret = secret;
  this.scope = scope;
  this.setCallbackUrl(callbackUrl);
  this.authUrl = 'https://github.com/login/oauth/authorize';
  this.accessUrl = 'https://github.com/login/oauth/access_token';
}

GitHub.prototype.setCallbackUrl = function(url)
{
  this.callbackUrl = url;
}

GitHub.prototype.getAuthUrl = function(state)
{  
  //concatonate multiple scopes if needed
  if(typeof this.scope == 'object'){
		var scope = this.scope.join(',');
	} else {
		scope = '';
	}
	
	//generate the data to send with the auth request
	var data = {
	  client_id: this.client_id,
	  redirect_uri: this.callbackUrl,
	  scope: scope,
	  state: state
	};
	
	//turn that into a URL format
	var query = querystring.stringify(data);
	return this.authUrl + '?' + query;
}

GitHub.prototype.getRandomState = function()
{
  //Just use the current time and date plus a random number
  var now = new Date();
  var string = now.toJSON();
  string += (Math.floor(Math.random() * 90000) + 10000).toString();
  
  //now md5 it, for good measure
  var md5sum = crypto.createHash('md5');
  md5sum.update(string);
  var randomState = md5sum.digest('hex');
  return randomState;
}

GitHub.prototype.importResponse = function(req, callback)
{
  //first check for error - not in GitHub documentation, but is in OAuth spec
  if(req.param('error_reason', false)){
  	throw new Error(req.param('error_description', 'There was an unknown error at GitHub'));
  }
  
  //now we check the states
  if(req.param('state') != req.session.randomState){
    throw new Error('Something strange happened, doesn\'t look like this came through the standard OAuth call');
  }
  
  //now we want the sexy code returned from GitHub
  this.oauthCode = req.param('code', false);
  if(!this.oauthCode){
    throw new Error('No valid code returned from GitHub to do the magic');
  }
  
  //now we get the access token
  this._getAccessToken(callback);
  
  //we're done here
  return this;
}

GitHub.prototype._getAccessToken = function(callback)
{
  //put together the data call to get the token
  var data = {
    client_id: this.client_id,
    redirect_uri: this.callbackUrl,
    client_secret: this.secret,
    code: this.oauthCode,
    state: this._randomState
  }
  
  console.log(data);
}

exports.GitHub = GitHub;