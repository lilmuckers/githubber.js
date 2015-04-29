/**
 * Created by rthacker on 4/29/2015.
 */
var util = require('util');


function Releases(api)
{
    this.api = api;

    //the api url endpoints
    this.urls = {
        releases       : '/repos/%s/%s/releases'
    }
}

Releases.prototype.list = function(user, repo, callback)
{
    var url = util.format(this.urls.releases, user, repo);
    this.api.get(url, null, callback);
};

Releases.prototype.create = function(user, repo, data, callback)
{
    var url = util.format(this.urls.releases, user, repo);
    this.api.post(url, data, callback);
};

module.exports = Releases;