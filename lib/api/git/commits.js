var util = require('util');


function Commits(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    commit           : '/repos/%s/%s/git/commits/%s',
    commits          : '/repos/%s/%s/git/commits'
  }
}


Commits.prototype.info = function(user, repo, sha, callback)
{
  if(typeof sha == 'function'){
    callback = sha;
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
  var url = util.format(this.urls.commit, user, repo, sha);
  this.api.get(url, null, callback);
}



Commits.prototype.create = function(user, repo, data, callback)
{
  if(typeof data == 'function'){
    callback = data;
    data = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.commits, user, repo);
  this.api.post(url, data, callback);
}

module.exports = Commits;