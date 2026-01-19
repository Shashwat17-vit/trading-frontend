const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Laxman!171717@cluster.y7reemk.mongodb.net/')
.then(result => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log(err);
});

module.exports = mongoose;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('trading', 'root', 'Laxman!171717', {dialect: 'mysql', host: 'localhost'});

// //module.exports = sequelize;

// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => { 
// MongoClient.connect('mongodb+srv://root:Laxman!171717@cluster.y7reemk.mongodb.net/')
// .then(client => {console.log('Connected!'); 
// _db = client.db();
// callback();
// })
// .catch(err=>{console.log(err);
//     throw err;
// });
// };

// const getDb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;