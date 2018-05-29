const rosetaRoute = require('./roseta-routes');

module.exports = (app, db) => {
    rosetaRoute(app,db)
}