var util = require('util');


function Users(api)
{
  this.api = api;
  
  this.urls = {
    user       : '/user',
    userUser   : '/user/%s'
  }
}

Users.prototype.info = function(user, callback)
{
  if(typeof user == 'function'){
    callback = user;
    var url = this.urls.user;
  } else {
    var url = util.format(this.urls.userUser, user);
  }
  this.api.get(url, null, callback);
}

Users.prototype.update = function(data, callback)
{
  this.api.patch(this.urls.user, data, callback);
}


module.exports = Users;