var util = require('util');


function Comments(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    issueComments: '/repos/%s/%s/issues/%s/comments',
    repoComments:  '/repos/%s/%s/issues/comments',
    comment:       '/repos/%s/%s/issues/comments/%s'
  }
}

Comments.prototype.list = function(user, repo, filter, callback)
{
}

Comments.prototype.issueList = function(user, repo, issue, callback)
{
}

Comments.prototype.info = function(user, repo, comment, callback)
{
}

Comments.prototype.create = function(user, repo, issue, comment, callback)
{
  if(typeof data == 'function'){
    callback = comment;
    comment = issue;
    issue = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.issueComments, user, repo, issue);
  this.api.post(url, comment, callback);
}

Comments.prototype.update = function(user, repo, comment, data, callback)
{
}

Comments.prototype.delete = function(user, repo, comment, callback)
{
}

module.exports = Comments;