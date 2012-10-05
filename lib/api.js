var repo = require('./api/repo.js');
var util = require('util');

function GitHubAPI(ghObj, accessToken)
{
  //set the github object and the access token to do magic stuff.
  this.ghObj = ghObj;
  this.accessToken = accessToken;
  this.urlBase = 'https://api.github.com%s';
  
  //set up the adaptors
  this.repo = new repo(this);
}

GitHubAPI.prototype._formatUrl = function(path)
{
  return util.format(this.urlBase, path);
}

GitHubAPI.prototype.post = function(url, data, callback)
{
  url = this._formatUrl(url);
  this.ghObj.post(url, this.accessToken, data, callback);
}

GitHubAPI.prototype.get = function(url, data, callback)
{
  url = this._formatUrl(url);
  this.ghObj.get(url, this.accessToken, data, callback);
}

GitHubAPI.prototype.patch = function(url, data, callback)
{
  url = this._formatUrl(url);
  this.ghObj.patch(url, this.accessToken, data, callback);
}

GitHubAPI.prototype.put = function(url, data, callback)
{
  url = this._formatUrl(url);
  this.ghObj.put(url, this.accessToken, data, callback);
}

GitHubAPI.prototype.delete = function(url, data, callback)
{
  url = this._formatUrl(url);
  this.ghObj.delete(url, this.accessToken, data, callback);
}

module.exports = GitHubAPI;