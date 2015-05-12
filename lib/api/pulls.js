var util = require('util');


function Pulls(api)
{
  this.api = api;
  
  //the api endpoint urls
  this.urls = {
    pulls        : '/repos/%s/%s/pulls',
    pull         : '/repos/%s/%s/pulls/%s',
    pullCommits  : '/repos/%s/%s/pulls/%s/commits',
    pullFiles    : '/repos/%s/%s/pulls/%s/files',
    merge        : '/repos/%s/%s/pulls/%s/merge'
  }
}

Pulls.prototype.list = function(user, repo, callback)
{
  if(typeof repo == 'function'){
    callback = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.pulls, user, repo);
  this.api.get(url, null, callback);
}

Pulls.prototype.info = function(user, repo, number, callback)
{
  if(typeof number == 'function'){
    callback = number;
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.pull, user, repo, number);
  this.api.get(url, null, callback);
}

Pulls.prototype.create = function(user, repo, data, callback)
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
  var url = util.format(this.urls.pulls, user, repo);
  this.api.post(url, data, callback);
}

Pulls.prototype.update = function(user, repo, number, data, callback)
{
  if(typeof data == 'function'){
    callback = data;
    data = number
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.pull, user, repo, number);
  this.api.patch(url, data, callback);
}

Pulls.prototype.commits = function(user, repo, number, callback)
{
  if(typeof number == 'function'){
    callback = number;
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.pullCommits, user, repo, number);
  this.api.get(url, null, callback);
}

Pulls.prototype.files = function(user, repo, number, callback)
{
  if(typeof number == 'function'){
    callback = number;
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.pullFiles, user, repo, number);
  this.api.get(url, null, callback);
}

Pulls.prototype.isMerged = function(user, repo, number, callback)
{
  if(typeof number == 'function'){
    callback = number;
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.merge, user, repo, number);
  this.api.get(url, null, callback);
}

Pulls.prototype.merge = function(user, repo, number, data, callback)
{
  if(typeof number == 'function'){
    callback = number;
    number = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.merge, user, repo, number);
  this.api.put(url, data, callback);
}

module.exports = Pulls;