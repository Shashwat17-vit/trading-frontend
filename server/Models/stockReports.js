const mongoose = require('../utils/database'); // 
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