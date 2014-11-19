github.js
=========

A node.js based github library for writing quick apps using the github api

## Usage

### With express.js 2.x
The below example is the way I personally use it, with the in built middleware for express. It will automatically perform the oAuth procedure and set up the API handler in the request object, making it all very easy to deal with.

The example configures the oAuth object, will authorise the user, and then list the repositories for the logged in user into the console.

```javascript
var express = require('express');
var CONFIG = require('config');
var GitHub = require('github.js');
var cookieSecret = 'string';
var MemStore = express.session.MemoryStore;

var github = new GitHub.GitHub('CLIENT ID', 'CLIENT SECRET', ['ARRAY','OF','SCOPES'], 'CALLBACK URL');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: cookieSecret, store: MemStore({
      reapInterval: 60000 * 10
    })}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
app.all('/', GitHub.Express(github), function(req, res){
  req.GitHub.repo.list(null, function(err, data){
    console.log(data);
  });
});

```DOIHFADSKHFSKHJDF
