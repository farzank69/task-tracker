require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes')

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.json({message: "Welcome to Task Tracker API"});
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})