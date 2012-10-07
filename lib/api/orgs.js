var util = require('util');


function Orgs(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    orgs      : '/user/orgs',
    userOrgs  : '/users/%s/orgs',
    org       : '/orgs/%s'
  }
}

Orgs.prototype.list = function(user, callback)
{
  //format urls
  if(user){
    var url = util.format(this.urls.userOrgs, user);
  } else {
    var url = this.urls.orgs;
  }
  
  //send the request
  this.api.get(url, null, callback);
}

Orgs.prototype.info = function(org, callback)
{
  var url = util.format(this.urls.org, org);
  this.api.get(url, null, callback);
}

Orgs.prototype.update = function(org, data, callback)
{
  var url = util.format(this.urls.org, org);
  this.api.patch(url, data, callback);
}


module.exports = Orgs;