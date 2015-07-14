var util = require('util');
var labels = require('./issues/labels.js');
var comments = require('./issues/comments.js');


function Issues(api)
{
  this.api = api;
  
  this.labels = new labels(api);
  this.comments = new comments(api);
  
  //the api url endpoints
  this.urls = {
    issues      : '/issues',
    repoIssues  : '/repos/%s/%s/issues',
    issue       : '/repos/%s/%s/issues/%s'
  }
}

Issues.prototype.list = function(user, repo, filters, callback)
{
  if(typeof user == 'function'){
    var url = this.urls.isses;
    filters = null;
    callback = user;
  } else if(typeof repo == 'function') {
    callback = repo;
    filter = null;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
    var url = util.format(this.urls.repoIssues, user, repo);
  } else if(typeof filters == 'function') {
    callback = filters;
    if(typeof repo == 'object' && !repo.full_name){
      filters = repo;
    }
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
    var url = util.format(this.urls.repoIssues, user, repo);
  } else {
    var url = util.format(this.urls.repoIssues, user, repo);
  }

  this.api.get(url, filters, callback);
}

Issues.prototype.info = function(user, repo, number, callback){
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
  var url = util.format(this.urls.issue, user, repo, number);
  this.api.get(url, null, callback);
}

Issues.prototype.create = function(user, repo, data, callback)
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
  var url = util.format(this.urls.repoIssues, user, repo);
  this.api.post(url, data, callback);
}

Issues.prototype.update = function(user, repo, number, data, callback)
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
  var url = util.format(this.urls.issue, user, repo, number);
  this.api.patch(url, data, callback);
}

module.exports = Issues;