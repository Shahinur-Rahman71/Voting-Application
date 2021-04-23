// running both side write this command => chmod +x start.sh and then ./start.sh
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { notFound,errorMsg } = require('./controllers');

const app = express();
const port = process.env.PORT || 4000;

// database connection
const db = require('./models');
const routes = require('./routes');

// used middleware
app.use(express.json());
app.use(cors());

// included router from routes folder
app.use('/api/auth', routes.auth);
app.use('/api/poll', routes.poll);

// for error message
app.use(errorMsg);
app.use(notFound);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});