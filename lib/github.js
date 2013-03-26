var querystring  = require('querystring'),
  crypto = require('crypto'),
  https   = require('https'),
    URL   = require('url');
  
  
function GitHub(client_id, secret, scope, callbackUrl)
{
  this.client_id = client_id;
  this.secret = secret;
  this.scope = scope;
  this.setCallbackUrl(callbackUrl);
  this.authUrl = 'https://github.com/login/oauth/authorize';
  this.accessUrl = 'https://github.com/login/oauth/access_token';
  //this.accessUrl = 'http://requestb.in/1kph6dt1';
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
  if(req.param('state') != req.session.randomOAuthState){
    throw new Error('Something strange happened, doesn\'t look like this came through the standard OAuth call');
  }
  
  //now we want the sexy code returned from GitHub
  this.oauthCode = req.param('code', false);
  if(!this.oauthCode){
    throw new Error('No valid code returned from GitHub to do the magic');
  }
  
  //now we get the access token
  this._getAccessToken(req, callback);
  
  //we're done here
  return this;
}

GitHub.prototype._getAccessToken = function(req, callback)
{
  //put together the data call to get the token
  var data = {
    client_id: this.client_id,
    redirect_uri: this.callbackUrl,
    client_secret: this.secret,
    code: req.param('code', false),
    state: req.session.randomOAuthState
  }
  
  //get the token and return it to the callback
  this.post(this.accessUrl, null, data, function(err, response, res){
    callback(err, response);
  });
}

GitHub.prototype.post = function(url, token, data, callback)
{
  this._send(url, token, data, 'POST', callback);
}

GitHub.prototype.get = function(url, token, data, callback)
{
  this._send(url, token, data, 'GET', callback);
}

GitHub.prototype.patch = function(url, token, data, callback)
{
  this._send(url, token, data, 'PATCH', callback);
}

GitHub.prototype.put = function(url, token, data, callback)
{
  this._send(url, token, data, 'PUT', callback);
}

GitHub.prototype.delete = function(url, token, data, callback)
{
  this._send(url, token, data, 'DELETE', callback);
}

GitHub.prototype._send = function(url, token, data, method, callback)
{
  //perform transforms on the url data to make it work
  var parsedUrl = URL.parse(url, true);
  if(!method) method = 'GET';
  if(parsedUrl.protocol == 'https:' && !parsedUrl.port) parsedUrl.port = 443;
  
  //deal with the token and other get variables
  var getQuery = {}
  if(method == 'GET'){
    for(var key in data){
      getQuery[key] = data[key];
    }
  }
  
  //github uses data written rather than query strings
  if(typeof data != 'string'){
    var data = JSON.stringify(data);
  }
  
  //the basic headers that are required
  var headers = {};
  headers['Host'] = parsedUrl.host;
  headers['Content-Length'] = data.length;
  
  //add an accept header so we always get JSON back.
  headers['Content-Type'] = 'application/json';
  
  //in the case of a get string we need to add the get vars onto the pathname
  
  //set up the request
  var result = '';
  var options = {
    host       : parsedUrl.hostname,
    port       : parsedUrl.port,
    path       : parsedUrl.pathname,
    method     : method,
    headers    : headers
  };
  
  if(token && typeof token == 'string'){
    getQuery.access_token = token;
  } else if(token && typeof token == 'object'){
    //username and password provided
    options.auth = token.username+':'+token.password;
  }
  
  //append the query onto the path
  if(Object.keys(getQuery).length > 0){
    options.path = options.path + '?' + querystring.stringify(getQuery);
  }
  
  //initiate the connection
  request = https.request(options, function(res){
    res.addListener('data', function(chunk){
      result += chunk;
    });
    res.addListener('end', function() {
      if(res.statusCode == 302){
        callback(null, null, res);
      } else if(res.statusCode < 200 || res.statusCode > 299){
        callback({ statusCode: res.statusCode, data: result}, null, res);
      } else if(result){
        callback(null, JSON.parse(result), res);
      } else {
        callback(null, null, res);
      }
    });
  });
  
  //send the data
  request.write(data);
  
  //catch an error
  request.on('error', function(e){
    callback(e);
  });
  request.end();
  
}

exports.GitHub = GitHub;