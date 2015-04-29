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
    var arguments = this.api.repos._buildRepoArgs(user, repo, callback);
    var url = util.format(this.urls.statuses, arguments.user, arguments.repo, arguments.branch);
    this.api.get(url, null, callback);
};

Releases.prototype.create = function(data, callback)
{
    var url = this.urls.releases;

    //fire off the request
    this.api.post(url, data, callback);
};

module.exports = Releases;