const libros = [{titulo:"harr1", precio:20}, {titulo:"harr2", precio:20}, {titulo:"harr3", precio:20}]
const users = [
    {
        id: 0,
        nombre:"pepe",
        admin: true
    },
    {
        id: 1,
        nombre:"carlos",
        admin: false
    }
]

const express = require("express");
const path = require("path")
const app = express(); //{}

// MIDDLEWARE LOGGER DE DATA
app.use("/", function(req, res, next){
    console.log("Bienvenido a la puerta 1")
    console.log("Aca te vamos a equipar con traje de astronauta")
    console.log("vamos a registrar quien sos")
    console.log("req.path",req.path)
    console.log("req.url", req.url)
    next()
})

/*
app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));
*/

function checkAuth (req, res, next){
    const id = req.params.id;
    const user = users[id]

    if(user.admin === true){
        next()
    } else {
        res.send("Error no pasas!!")
    }
}

app.get('/panel/:id', checkAuth, function(req, res){
    res.send("Bievenido a Bordo!!!")
})

///////////////// ES LA NAVE ALIEN //////////////
app.get('/', function(req, res, next){
    next()
    res.send('Hola Mundo')
})

app.get('/nosotros', function(req, res){
    res.send('Hola bienvenido, nosostros somos....')
})

app.get('/productos',  function(req, res){
    console.log("libros listados", libros)
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/productos/:id/', function(req, res){
    console.log("req.params", req.params) //{ id: '3' }
    console.log("req.params.id", req.params.id)

    const id = req.params.id;
    
    res.send(libros[id])
})

app.get('/registrate', function(req, res){
    res.sendFile(path.join(__dirname + '/registrate.html'));
})

app.post("/registrate", function(req, res){
    console.log("Simulando un POST")
    console.log("req.body", req.body)
    libros.push({
        titulo:req.body.titulo,
        precio:req.body.precio
    })
    console.log("libros agregado", libros)
    res.send("Buenisimo ya cargaste el libro")
})
///////////////// ES LA NAVE ALIEN //////////////

app.listen(3000, function(){
    console.log("server escuchando en puerto 3000")
})