var util = require('util');


function OAuth(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    auths       : '/authorizations',
    auth        : '/authorizations/%s'
  }
}

OAuth.prototype.list = function(callback)
{
  this.api.get(this.urls.auths, null, callback);
}

OAuth.prototype.info = function(auth, callback)
{
  if(typeof auth == "object"){
    auth = auth.id;
  }
  var url = util.format(this.urls.auth, auth);
  this.api.get(url, null, callback);
}

OAuth.prototype.create = function(data, callback)
{
  this.api.post(this.urls.auths, data, callback);
}

OAuth.prototype.update = function(auth, data, callback)
{
  if(typeof auth == "object"){
    auth = auth.id;
  }
  var url = util.format(this.urls.auth, auth);
  this.api.patch(url, data, callback);
}

OAuth.prototype.delete = function(auth, callback)
{
  if(typeof auth == "object"){
    auth = auth.id;
  }
  var url = util.format(this.urls.auth, auth);
  this.api.delete(url, null, callback);
}

module.exports = OAuth;