var express= require('express');
var router= express.Router();
var ObjectID =  require('mongodb').ObjectID;

function initIncidentes(db){
    
    var incidentesColl = db.collection('incidentes');
    router.get('/', (req, res, next)=>{


        incidentesColl.find().toArray((err, plantas)=>{
            if(err){
                console.log(err);
                return res.status(404).json({"Error": "Error al extraer informacion de los incidentes en la base de Datos"});
            }
            return res.status(200).json(plantas);
        });
    });//get all
    router.get('/:id', (req, res, next)=>{
        var id = new ObjectID(req.params.id);
        incidentesColl.findOne({"_id": id} ,(err, doc)=>{
            if(err){
                console.log(err);
                return res.status(404).json({"error": "No se puede obtener informacion del incidente"});
            }
            return res.status(200).json(doc);
        });// findOne
    });// /:id

    router.post('/', (req, res, next)=>{
        var newIncidente = Object.assign(
            {}, 
            {
                "Descripcion": "",
                "fechayhora":new Date().getTime(),
                "tipo": "",
                "estado": "",
                "uso": "",
                "UsuarioRegistra": 0,
                "UsuarioAsignado": 0
            },
             req.body
            );
            incidentesColl.insertOne(newIncidente, (err, rslt)=>{
               if(err){
                   console.log(err);
                   return res.status(404).json({"Error" : "No se pudo agregar nueva planta"});
               }
               if(rslt.ops.length==0){
                   console.log(rslt);
                   return res.status(404).json({"Error" : "No se pudo agregar nueva planta"});

               }
               return res.status(200).json(rslt.ops[0]); 
            });
    });//post

    return router;
}

module.exports = initIncidentes;