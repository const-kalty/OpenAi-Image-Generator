const path = require('path')

const express = require('express');
const dotenv = require('dotenv').config({path:"./vars/.env"});
const port = process.env.PORT ||  5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/openai', require('./route/openaiRoutes.js'))

app.listen(port, ()=>console.log(`server is running on port ${port}`))