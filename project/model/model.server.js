module.exports = function () {
    require('user/user.model.server.js')();
    require('agent/agent.model.server')();
    require('artist/artist.model.server')();
    require('promoter/promoter.model.server')();
    require('venue/venue.model.server')();
};