// const { getDb } = require('../utils/database');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Laxman!171717@cluster.y7reemk.mongodb.net/')
.then(result => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log(err);
});

const Schema = mongoose.Schema;

const stockReportSchema = new Schema({
    ticker: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('StockReport', stockReportSchema);


// class StockReports {
//     constructor(ticker, date, open, duration){

//     this.ticker = ticker;
//     this.date = date;
//     this.open = open;
//     this.duration = duration;
//     }

//     save(){
//         const db = getDb();
//         return db.collection('stockReports').insertOne(this);
//     }
// }

// module.exports = StockReports;