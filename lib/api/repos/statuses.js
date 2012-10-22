var util = require('util');


function Statuses(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    statuses       : '/repos/%s/%s/statuses/%s'
  }
}

Statuses.prototype.list = function(user, repo, sha, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, sha, callback);
  var url = util.format(this.urls.statuses, arguments.user, arguments.repo, arguments.branch);
  this.api.get(url, null, callback);
}

Statuses.prototype.create = function(user, repo, sha, data, callback)
{
  if(typeof data == 'function'){
    callback = data;
    data = sha;
    sha = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.statuses, arguments.user, arguments.repo, arguments.branch);
  this.api.get(url, data, callback);
}

module.exports = Statuses;