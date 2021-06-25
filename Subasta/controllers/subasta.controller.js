const { exception } = require('console');
const { response, request } = require('express');
const mongo = require('../models/database');
const { notify } = require('../routes/auto.routes');

const subastaGet = async (req, res) => {
    try {
        const { patente } = req.params;
        const query = { patente: `${patente}` };
        var subasta = await mongo.database.collection("Subasta").findOne(query); 
        if (subasta) {
            res.status(200).end;
            res.json(subasta);
        }
        else {
            res.status(204).end;
        }
    }
    catch(ex) {
        res.status(500).end;
        res.json("Error al intentar encontrar la subasta indicada.");
    }
}

// agregar subasta
const subastaPost = async (req, res = response) => {
    try {
        const { patente, fecha_inicio, fecha_fin, valor_inicial } = req.body;

        collection = mongo.database.collection("Subasta");

        subastaExiste = await collection.findOne({ patente: patente});

        if(subastaExiste){
            throw (`Ya existe una subasta para el auto con patente ${patente}`);
        } 
        if( Date.parse(fecha_inicio) > Date.parse(fecha_fin)){
            throw (`La fecha de inicio debe ser menor a la fecha de fin`);
        }
        if( valor_inicial <= 0){
            throw (`El valor inicial de la subasta debe ser mayor a cero`);
        }

        autoExiste = await mongo.database.collection("Auto").findOne({ patente: patente });

        if(!autoExiste){
            throw (`El auto no esta registrado en la base de datos`);
        }

        mongo.database.collection("Subasta").insertOne(
            {
                "patente": patente, 
                "fecha_inicio": Date.parse(fecha_inicio), 
                "fecha_fin": Date.parse(fecha_fin), 
                "valor_inicial": valor_inicial
            }
        );
        res.status(201).end;
        res.json();
        console.log("Se inserto la subasta correctamente!");
    }
    catch(ex) {
        if(ex) {
            res.json(ex);
        } else {
            res.json("Error al insertar la subasta. La subasta debe tener una patente, fecha_incio, fecha_fin y valor_incial.");
        }
        res.status(500).end;
    }
};

// ofertar en la subasta
const subastaPut = async (req, res = response) => {
    
    const { patente } = req.params;
    const { user, oferta } = req.body;

    collection = mongo.database.collection("Subasta");
    
    try {
        userExiste = await mongo.database.collection("Usuario").findOne({ user:  `${user}` });
        if(!userExiste){
            throw (`El usuario ${user} no esta registrado y no puede ofertar`);
        }

        subastaExiste = await collection.findOne({ patente:  `${patente}` });
        if(!subastaExiste){
            throw (`No existe una subasta para el auto con la patente ${patente}`);
        } else {
            if(subastaExiste.mejor_oferta && subastaExiste.mejor_oferta.oferta > oferta){
                throw(`La oferta hecha es menor a la oferta existente`);
            }
            else {
                const query = { patente: `${patente}` };
                const updateDocument = { $set: { mejor_oferta: {user: `${user}`,  oferta: `${oferta}` } } };
                collection.updateOne(query, updateDocument);
            }
        }
        res.status(200).end;
        res.json("Se actualizo la subasta correctamente!");
    }
    catch (ex){
        if(typeof ex === 'string' ) {
            res.json(ex);
        } else {
            res.json("Error al hacer una oferta.");
        }
        res.status(500).end;       
    }
}

module.exports = {
    subastaGet,
    subastaPost,
    subastaPut
}