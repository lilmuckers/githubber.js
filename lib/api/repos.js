var util = require('util');
var hooks = require('./repos/hooks.js');


function Repos(api)
{
  this.api = api;
  
  //repository hooks api
  this.hooks = new hooks(api);

  //setup the urls
  this.urls = {
    repos           : '/user/repos',
    userRepos       : '/users/%s/repos',
    orgRepos        : '/orgs/%s/repos',
    repo            : '/repos/%s/%s',
    contributors    : '/repos/%s/%s/contributors',
    tags            : '/repos/%s/%s/tags',
    branches        : '/repos/%s/%s/branches',
    branch          : '/repos/%s/%s/branches/%s',
    languages       : '/repos/%s/%s/languages',
    teams           : '/repos/%s/%s/teams'
  }
}

Repos.prototype.list = function(user, callback)
{
  //format urls
  var url = this.urls.repos;
  if(user != null && typeof user == 'string'){
    var url = util.format(this.urls.userRepos, user);
  } else if(typeof user == 'function'){
    callback = user;
  }
  
  //send the request
  this.api.get(url, null, callback);
}

Repos.prototype.listOrg = function(org, callback)
{
  var url = util.format(this.urls.orgRepos, org);
  //send the request
  this.api.get(url, null, callback);
}

Repos.prototype._buildRepoArgs = function(user, repo, branch, callback)
{
  //sanitise the repo arguments
  //allow for a full repo object to be passed
  if(typeof user == 'object'){
    if(!user.full_name){
      throw Error('This is not a valid repo object as returned by GitHub');
    }
    user = user.full_name;
  }
  
  //allow for the format user/repo to be passed (full_name)
  if(user.indexOf('/') != -1){
    //reformat branch and callback
    if(branch){
      callback = branch;
      branch = repo;
    } else {
      callback = repo;
    }
    
    //now to the user and repo stuff
    var repoInfo = user.split('/');
    user = repoInfo[0];
    repo = repoInfo[1];
  }
  
  //now determine the branch/callback split
  
  //return a consistent list of arguments for the URLs
  return {
    user: user,
    repo: repo,
    branch: branch,
    callback: callback
  }
}

Repos.prototype.info = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.repo, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.update = function(user, repo, data, callback){
    /** TODO:: Make this more general-case **/
    var arguments = this._buildRepoArgs(user, repo, data, callback);
    var url = util.format(this.urls.repo, arguments.user, arguments.repo);
    this.api.patch(url, arguments.branch, arguments.callback);
}

Repos.prototype.create = function(data, callback)
{
  if(data.org){
    var url = util.format(this.urls.orgRepos, data.org);
  } else {
    var url = this.urls.repos;
  }
  
  //fire off the request
  this.api.post(url, data, callback);
}

Repos.prototype.delete = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.repo, arguments.user, arguments.repo);
  this.api.delete(url, null, arguments.callback);
}

Repos.prototype.contributors = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.contributors, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.tags = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.tags, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.branches = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.branches, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.branch = function(user, repo, branch, callback)
{
  var arguments = this._buildRepoArgs(user, repo, branch, callback);
  //build the url and send the request
  var url = util.format(this.urls.branch, arguments.user, arguments.repo, arguments.branch);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.languages = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.languages, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}

Repos.prototype.teams = function(user, repo, callback)
{
  var arguments = this._buildRepoArgs(user, repo, callback);
  //build the url and send the request
  var url = util.format(this.urls.teams, arguments.user, arguments.repo);
  this.api.get(url, null, arguments.callback);
}


module.exports = Repos;