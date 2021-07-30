const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

//Use method libs
const app = express();
require('dotenv').config();

//MIDDELWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//DATABASE SETUP
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>console.log('Successfully conection'))

//ROUTES SETUP
app.use('/api/category', require('./routes/category'));
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));

//LISTEN TO PORT
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server execute on port ${port}`);
})