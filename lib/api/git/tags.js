var util = require('util');


function Tags(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    tag           : '/repos/%s/%s/git/tags/%s',
    tags          : '/repos/%s/%s/git/tags'
  }
}


Tags.prototype.info = function(user, repo, sha, callback)
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
  var url = util.format(this.urls.tag, user, repo, sha);
  this.api.get(url, null, callback);
}

Tags.prototype.create = function(user, repo, data, callback)
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
  var url = util.format(this.urls.tags, user, repo);
  this.api.post(url, data, callback);
}

module.exports = Tags;