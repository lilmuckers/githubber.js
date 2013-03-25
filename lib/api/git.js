var util = require('util');
var blobs = require('./git/blobs.js');
var commits = require('./git/commits.js');
var refs = require('./git/refs.js');
var tags = require('./git/tags.js');
var trees = require('./git/trees.js');


function Git(api)
{
  this.api = api;
  
  this.blobs = new blobs(api);
  this.commits = new commits(api);
  this.refs = new refs(api);
  this.tags = new tags(api);
  this.trees = new trees(api);
}

module.exports = Git;