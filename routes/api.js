var express= require('express');
var router= express.Router();


function initApi(db){
    var plantasRouter = require('./api/incidentes')(db);
    router.use('/incidentes', plantasRoutes);
    return router;
}

module.exports = initApi;