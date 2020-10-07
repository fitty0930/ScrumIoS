const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
//configuraciones del servidor
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
const mongoURI = 'mongodb+srv://scrumuser123:scrum123@cluster0.vtmxc.mongodb.net/scrumGame?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }) // Conexion con la base de datos
    .then(() => console.log('MongoDB Conectado: ' + mongoURI.substr(0, 7)))
    .catch(err => console.log(err));
app.listen(port, () => {
    console.log('Estamos en puerto: ' + port)
});