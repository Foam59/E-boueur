let port=8080;

let express = require('express');

let app = express();
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

    app.use(express.static('public'));
// Chargement de la page index.html


    app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(port);