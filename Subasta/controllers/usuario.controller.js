const { response, request } = require('express');
const mongo = require('../models/database');

// buscar usuario
const usuarioGet = async (req = request, res = response) => {
    try{
        const { user } = req.params;
        const query = { user: `${user}` };
        var usuario = await mongo.database.collection("Usuario").findOne(query); 
        if (usuario){
            res.status(200);
            res.json(usuario);
        }
        else {
            res.status(204);
            res.json("No existe el usuario solicitado.");
        }
    }
    catch(ex){
        res.status(500);
        res.json("Error al intentar encontrar el usuario indicado.");
    }
};

// agregar usuario
const usuarioPost = async (req, res = response) => {
    try{
        const usuario = req.body;
        console.log(usuario);
        mongo.database.collection("Usuario").insertOne(usuario);
        res.status(201);
        res.json();
    }
    catch(ex){
        res.status(500);
        res.json("Error al insertar usuario");
    }
};

// actualizar usuario
const usuarioPut = async (req, res = response) => {
    try {
        const query = { user: `${req.params.user}` };
        const updateDocument = { $set: req.body };

        mongo.database.collection("Usuario").updateOne(query, updateDocument);

        res.status(200);
        res.json("Se actualizo el usuario correctamente!");

    } catch(ex) {
        res.status(500);
        res.json("Error al actualizar usuario");
    }
};

// eliminar usuario
const usuarioDelete = async (req, res = response) => {
    try{
        const query = { user: `${req.params.user}` };

        const deleteResult = await mongo.database.collection("Usuario").deleteOne(query);

        if (deleteResult.deletedCount){
            console.log("El usuario fue eliminado");
            res.status(200);
            res.json();    
        } else {
            res.status(204);
            res.json("No se encontro el usuario.");
        }
    } catch(ex) {
        res.status(500);
        res.json("Error al eliminar usuario");
    }
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}