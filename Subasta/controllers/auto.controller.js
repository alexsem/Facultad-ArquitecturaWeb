const { response, request } = require('express');
const mongo = require('../models/database');

// todos los autos en venta
const autoGet = async (req = request, res = response) => {
    try{
        const query = { $or: [ {estado: null }, { estado: "en venta" } ]};
        var auto = mongo.database.collection("Auto").find(query);
        let list = [];
        await auto.forEach(element => list.push(element)); 
        res.status(200); 
        res.json({list});
    }
    catch(ex){
        res.status(500);
        res.json("Error al intentar encontrar los autos.");
    }
}

// buscar auto por patente
const autoGetByPatente = async (req = request, res = response) => {
    try{
        const { patente } = req.params;
        const query = { patente: `${patente}` };
        var auto = await mongo.database.collection("Auto").findOne(query); 
        if (auto){
            res.status(200);
            res.json(auto);
        }
        else {
            res.status(204);
            res.json("No existe el auto solicitado.");
        }
    }
    catch(ex){
        res.status(500);
        res.json("Error al intentar encontrar el auto indicado.");
    }
};

// agregar auto
const autoPost = async (req, res = response) => {
    try{
        const auto = req.body;
        mongo.database.collection("Auto").insertOne(auto);
        res.status(201);
        res.json();
        console.log("Se inserto el auto correctamente!");
    }
    catch(ex){
        res.status(500);
        res.json("Error al insertar auto");
    }
};

// actualizar auto
const autoPut = async (req, res = response) => {
    try {
        const query = { patente: `${req.params.patente}` };
        const updateDocument = { $set: req.body };

        mongo.database.collection("Auto").updateOne(query, updateDocument);

        console.log("Se actualizo el auto correctamente!")
        res.status(200);
        res.json();
    } catch(ex) {
        res.status(500);
        res.json("Error al actualizar auto");
    }
};

// eliminar auto
const autoDelete = async (req, res = response) => {
    try{
        const query = { patente: `${req.params.patente}` };

        const deleteResult = await mongo.database.collection("Auto").deleteOne(query);

        if (deleteResult.deletedCount){
            console.log("El auto fue eliminado");
            res.status(200);
            res.json();    
        } else {
            console.log("No se encontro el auto.");
            res.status(204);
            res.json("No se encontro el auto.");
        }
    } catch(ex) {
        res.status(500);
        res.json("Error al eliminar auto");
    }
};

module.exports = {
    autoGet,
    autoGetByPatente,
    autoPost,
    autoPut,
    autoDelete
}