const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Admins = require('./routes/admins.route')
    //configuraciones del servidor
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
// Conexion a la base de datos mongo db
const mongoURI = 'mongodb+srv://scrumuser123:scrum123@cluster0.vtmxc.mongodb.net/scrumGame?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }) // Conexion con la base de datos
    .then(() => console.log('Base de datos conectada: ' + mongoURI.substr(0, 7)))
    .catch(err => console.log(err));
//Configuracion de como usar las rutas
app.use('/admins', Admins);
app.listen(port, () => {
    console.log('Estamos en puerto: ' + port)
});