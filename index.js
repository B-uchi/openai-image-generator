const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config('./etc/secrets/.env');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/openai', require('./routes/openAIRoutes'))

app.listen(port, ()=>{
    console.log(`Server succesfully started at port ${port}`)
})
