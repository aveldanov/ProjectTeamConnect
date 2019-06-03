const express = require('express');
const app = express();
const connectDB = require('./config/db');

//Connect Database
connectDB();

app.get('/', (req, res) => res.send('API is Running!'))

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));