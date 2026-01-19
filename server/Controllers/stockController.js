const StockReports = require('../Models/stockReports');
const path = require('path');

// Show stock form
exports.getStock = (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/Stock.html'));
};

// Handle stock form submission
exports.postStock = async (req, res) => {
    try {
        const { ticker, date, open, duration } = req.body;
        
        // Create stock report instance
        const stockReport = new StockReports(
            ticker,
            date,
            parseFloat(open),
            parseInt(duration)
        );
        
        // Save to MongoDB
        await stockReport.save();
        
        // Console log the created stock report
        console.log('=== New Stock Report Created ===');
        console.log('Ticker:', ticker);
        console.log('Date:', date);
        console.log('Open:', open);
        console.log('Duration:', duration);
        console.log('================================');
        
        // Send success page
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Success</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        text-align: center;
                        max-width: 450px;
                    }
                    h2 { color: #28a745; margin-bottom: 20px; }
                    p { color: #555; margin: 10px 0; }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 30px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 10px 5px;
                    }
                    a:hover { transform: translateY(-2px); }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>✅ Stock Report Added Successfully!</h2>
                    <p><strong>Ticker:</strong> ${ticker}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Open:</strong> $${open}</p>
                    <p><strong>Duration:</strong> ${duration} days</p>
                    <a href="/stock">Add Another</a>
                    <a href="/">Home</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error creating stock report:', error);
        
        // Send error page
        res.status(400).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        text-align: center;
                        max-width: 450px;
                    }
                    h2 { color: #dc3545; margin-bottom: 20px; }
                    p { color: #555; margin: 20px 0; }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 30px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>❌ Error</h2>
                    <p>Failed to add stock report. Please try again.</p>
                    <a href="/stock">Try Again</a>
                </div>
            </body>
            </html>
        `);
    }
};

