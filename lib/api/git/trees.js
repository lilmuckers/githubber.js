var util = require('util');


function Trees(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    tree           : '/repos/%s/%s/git/trees/%s',
    treeRecursive  : '/repos/%s/%s/git/trees/%s?recursive=1',
    trees          : '/repos/%s/%s/git/trees'
  }
}


Trees.prototype.info = function(user, repo, sha, callback)
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
  var url = util.format(this.urls.tree, user, repo, sha);
  this.api.get(url, null, callback);
}

Trees.prototype.infoRecursive = function(user, repo, sha, callback)
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
  var url = util.format(this.urls.treeRecursive, user, repo, sha);
  this.api.get(url, null, callback);
}

Trees.prototype.create = function(user, repo, data, callback)
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
  var url = util.format(this.urls.trees, user, repo);
  this.api.post(url, data, callback);
}

module.exports = Trees;