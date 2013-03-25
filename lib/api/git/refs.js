var util = require('util');


function Refs(api)
{
  this.api = api;
  
  //the api url endpoints
  this.urls = {
    ref           : '/repos/%s/%s/git/refs/%s',
    refs          : '/repos/%s/%s/git/refs'
  }
}

Refs.prototype.info = function(user, repo, ref, callback)
{
  if(typeof ref == 'function'){
    callback = ref;
    ref = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.ref, user, repo, sha);
  this.api.get(url, null, callback);
}

Refs.prototype.list = function(user, repo, callback)
{
  var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
  var url = util.format(this.urls.refs, arguments.user, arguments.repo);
  this.api.get(url, null, callback);
}

Refs.prototype.listNamespace = function(user, repo, namespace, callback)
{
  this.info(user, repo, namespace, callback);
}

Refs.prototype.create = function(user, repo, data, callback)
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
  var url = util.format(this.urls.refs, user, repo);
  this.api.post(url, data, callback);
}

Refs.prototype.update = function(user, repo, ref, data, callback)
{
  if(typeof data == 'function'){
    callback = data;
    data = ref
    ref = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.ref, user, repo, ref);
  this.api.patch(url, data, callback);
}

Refs.prototype.delete = function(user, repo, ref, callback)
{
  if(typeof ref == 'function'){
    callback = ref;
    ref = repo;
    if(typeof user == 'object'){
      user = user.full_name;
    }
    if(user.indexOf('/') != '-1'){
      user = user.split('/');
      repo = user[1];
      user = user[0];
    }
  }
  var url = util.format(this.urls.ref, user, repo, ref);
  this.api.delete(url, null, callback);
}


module.exports = Refs;