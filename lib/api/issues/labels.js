var util = require('util');


function Labels(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    labels           : '/repos/%s/%s/labels',
    label            : '/repos/%s/%s/labels/%s',
    issueLabels      : '/repos/%s/%s/issues/%s/labels',
    issueLabel       : '/repos/%s/%s/issues/%s/labels/%s',
    milestoneLabels  : '/repos/%s/%s/milestones/%s/labels'
  }
}

Labels.prototype.list = function(user, repo, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
  var url = util.format(this.urls.labels, arguments.user, arguments.repo);
  this.api.get(url, null, callback);
}

Labels.prototype.create = function(user, repo, sha, data, callback)
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

module.exports = Labels;