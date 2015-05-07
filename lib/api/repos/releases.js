/**
 * Created by rthacker on 4/29/2015.
 */
var util = require('util');


function Releases(api)
{
    this.api = api;

    //the api url endpoints
    this.urls = {
        releases        : '/repos/%s/%s/releases',
        info            : '/repos/%s/%s/releases/%s',
        delete          : '/repos/%s/%s/releases/%s',
        update          : '/repos/%s/%s/releases/%s'
    }
}

Releases.prototype.list = function(user, repo, filters, callback)
{
    var url = util.format(this.urls.releases, user, repo);
    this.api.get(url, filters, callback);
};

Releases.prototype.info = function(user, repo, tagname, callback)
{
    var url = util.format(this.urls.info, user, repo, tagname);
    this.api.get(url, null, callback);
};

Releases.prototype.create = function(user, repo, data, callback)
{
    var url = util.format(this.urls.releases, user, repo);
    this.api.post(url, data, callback);
};

Releases.prototype.update = function(user, repo, tagname, data, callback)
{
    var url = util.format(this.urls.update, user, repo, tagname);
    this.api.patch(url, data, callback);
};

Releases.prototype.delete = function(user, repo, tagname, callback)
{
    var url = util.format(this.urls.delete, user, repo, tagname);
    this.api.delete(url, null, callback);
};

module.exports = Releases;