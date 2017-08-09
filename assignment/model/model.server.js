module.exports = function () {
    require('user/user.model.server.js')();
    require('website/website.model.server.js')();
    require('page/page.model.server.js')();
    require('widget/widget.model.server.js')();
};