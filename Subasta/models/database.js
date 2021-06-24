const { MongoClient } = require('mongodb');

class Mongo {
    constructor(){
        this.MongoClient = require('mongodb').MongoClient;
        this.body = require('body-parser');
        this.CONNECTION_URL = "mongodb://localhost:27017/";
        this.DATABASE_NAME = "Subasta";
    };

    async connect(){
        MongoClient.connect(this.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
            if(error) {
                throw error;
            }
            this.database = client.db(this.DATABASE_NAME);
            console.log("Connected to `" + this.DATABASE_NAME + "`!");
        });
    };
}

module.exports = new Mongo();