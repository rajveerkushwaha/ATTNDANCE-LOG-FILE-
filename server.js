const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bot = require('./bot');

const app = express();
const { PORT } = require('./config');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, rollNumber, date } = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - Name: ${name}, Roll Number: ${rollNumber}, Date: ${date}\n`;

    // Save to log file
    fs.appendFile('attendance.txt', logEntry, (err) => {
        if (err) {
            console.error('Error saving attendance:', err);
            return res.status(500).send('Error saving attendance');
        }

        // Send notification to Telegram
        const message = `New Attendance Entry:\nName: ${name}\nRoll Number: ${rollNumber}\nDate: ${date}`;
        bot.sendMessage(message);

        res.send('Attendance recorded successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 