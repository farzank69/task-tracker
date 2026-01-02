require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/database');

const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.use('/api/tasks')

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})