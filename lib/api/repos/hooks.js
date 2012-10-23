var util = require('util');
var querystring  = require('querystring');


function Hooks(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    hooks       : '/repos/%s/%s/hooks',
    hook        : '/repos/%s/%s/hooks/%s',
    test        : '/repos/%s/%s/hooks/%s/test',
    pshreg      : '/hub'
  }
  
  this.pshTopic = 'https://github.com/%s/%s/events/%s';
}

Hooks.prototype.list = function(user, repo, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.hooks, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.branch);
}

Hooks.prototype.info = function(user, repo, hook, callback)
{
  if(typeof user == 'object' && user.events){
    var url = user.url.replace('https://api.github.com', '');
    callback = repo;
  } else {
    var arguments = this.api.repos._buildRepoArgs(user, repo, hook, callback);
    var url = util.format(this.urls.hook, arguments.user, arguments.repo, arguments.branch);
    callback = arguments.callback;
  }
  this.api.get(url, null, callback);
}

Hooks.prototype.create = function(user, repo, data, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, data, callback);
  var url = util.format(this.urls.hooks, arguments.user, arguments.repo);
  this.api.post(url, arguments.branch, arguments.callback);
}

Hooks.prototype.update = function(user, repo, hook, data, callback)
{
  if(typeof data == 'function'){
    callback = data;
    data = hook;
    hook = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = uril.format(this.urls.hook, user, repo, hook);
  this.api.patch(url, data, callback);
}

Hooks.prototype.test = function(user, repo, hook, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, hook, callback);
  var url = util.format(this.urls.test, arguments.user, arguments.repo, arguments.branch);
  this.api.get(url, null, arguments.callback);
}

Hooks.prototype.delete = function(user, repo, hook, callback)
{
  if(typeof user == 'object' && user.events){
    var url = user.url.replace('https://api.github.com', '');
    callback = repo;
  } else {
    var arguments = this.api.repos._buildRepoArgs(user, repo, hook, callback);
    var url = util.format(this.urls.hook, arguments.user, arguments.repo, arguments.branch);
    callback = arguments.callback;
  }
  this.api.delete(url, null, callback);
}

Hooks.prototype._pshRequest = function(user, repo, event, subscribe, callbackUrl, callback)
{
  if(typeof callbackUrl == 'function'){
    callback = callbackUrl;
    callbackUrl = subscribe;
    subscribe = event;
    event = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var topic = util.format(this.pshTopic, user, repo, event);
  var data = {
    "hub.mode"     : subscribe,
    "hub.topic"    : topic,
    "hub.callback" : callbackUrl
  }
  var postData = querystring.stringify(data);
  this.api.post(this.urls.pshreg, postData, callback);
}

Hooks.prototype.subscribe = function(user, repo, event, callbackUrl, callback)
{
  this._pshRequest(user, repo, event, "subscribe", callbackUrl, callback);
}
Hooks.prototype.unsubscribe = function(user, repo, event, callbackUrl, callback)
{
  this._pshRequest(user, repo, event, "unsubscribe", callbackUrl, callback);
}

module.exports = Hooks;