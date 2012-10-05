var util = require('util');


function Repo(api)
{
  this.api = api;

  //setup the urls
  this.urls = {
    repos           : '/user/repos',
    userRepos       : '/users/%s/repos',
    orgRepos        : '/orgs/%s/repos',
    repo            : '/repos/%s/%s',
    contributors    : '/repos/%s/%s/contributors',
    tags            : '/repos/%s/%s/tags',
    branches        : '/repos/%s/%s/branches',
    branch          : '/repos/%s/%s/branches/%s'
  }
}

Repo.prototype.list = function(user, callback)
{
  //format urls
  if(user){
    var url = util.format(this.urls.userRepos, user);
  } else {
    var url = this.urls.repos;
  }
  
  //send the request
  this.api.get(url, null, callback);
}

module.exports = Repo;