const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Laxman!171717@cluster.y7reemk.mongodb.net/')
.then(result => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log(err);
});

module.exports = mongoose;
