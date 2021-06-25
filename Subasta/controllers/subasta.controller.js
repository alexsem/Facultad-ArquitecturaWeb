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
        console.log(patente, fecha_inicio, fecha_fin, valor_inicial);

        collection = mongo.database.collection("Subasta");

        subastaExiste = await collection.findOne({ patente: patente});
        console.log(subastaExiste);

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

module.exports = {
    subastaGet,
    subastaPost,
    //subastaPut,
    //subastaDelete
}