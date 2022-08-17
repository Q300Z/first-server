const mongoDB = require('mongodb');
const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING || "mongodb://localhost:27017?socketTimeoutMS=60000" );
try{
    client.connect()
    const db = mongoDB.Db = client.db(process.env.DB_NAME || "first-server");
    const data = mongoDB.Collection = db.collection(process.env.SITE_COLLECTION_NAMES || "first-server");
    console.log(`Successfully connected to MongoDB`);
} catch(e){
    console.log(e)
    client.close()
}
module.exports = mongoDB;

