var util = require('util');


function Contents(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    readme       : '/repos/%s/%s/readme',
    contents     : '/repos/%s/%s/contents/%s',
    archive      : '/repos/%s/%s/%s/%s'
  }
  
  this.archiveFormats = {
    tar          : 'tarball',
    zip          : 'zipball'
  }
  
  this.masterRef = 'master';
}

Contents.prototype.readme = function(user, repo, callback)
{
    var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
    var url = util.format(this.urls.readme, arguments.user, arguments.repo);
    this.api.get(url, null, arguments.callback);
}

Contents.prototype.get = function(user, repo, path, callback)
{
  if(typeof sha == 'function'){
    callback = path;
    path = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  
  this.refGet(user, repo, path, this.masterRef, callback);
}

Contents.prototype.refGet = function(user, repo, path, ref, callback)
{
  if(typeof data == 'function'){
    callback = ref;
    ref = path
    path = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.contents, user, repo, path);
  
  //we're explicitly setting the reference
  var data = {
    ref : ref
  }
  this.api.get(url, data, callback);
}

Contents.prototype.getArchive = function(user, repo, type, ref, callback)
{
  if(typeof data == 'function'){
    callback = ref;
    ref = type;
    type = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.archive, user, repo, type, ref);
  
  this.api.get(url, null, function(err, data, response){
    //error handling
    if(err){
      callback(err);
      return;
    }
    
    //get the file location
    callback(null, {
      url: response.headers.location
    });
  });
}

Contents.prototype.zip = function(user, repo, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
  this.getArchive(arguments.user, arguments.repo, this.archiveFormats.zip, this.masterRef, arguments.branch);
}

Contents.prototype.tar = function(user, repo, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
  this.getArchive(arguments.user, arguments.repo, this.archiveFormats.tar, this.masterRef, arguments.branch);
}


module.exports = Contents;