
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.get('/canciones', (req, res) => {
       const canciones = fs.readFileSync('./canciones.json', 'utf-8');
         res.json(JSON.parse(canciones));
    })

app.post('/canciones', (req, res) => {
    const canciones = fs.readFileSync('./canciones.json', 'utf-8');
    const cancionesNuevas = JSON.parse(canciones);
    cancionesNuevas.push(req.body);
    fs.writeFileSync('./canciones.json', JSON.stringify(cancionesNuevas));
    res.json(cancionesNuevas);
    res.status(201).send('Cancion agregada con exito');
})

app.delete('/canciones/:id', (req, res) => {
    const canciones = fs.readFileSync('./canciones.json', 'utf-8');
    const cancionesNuevas = JSON.parse(canciones);
    const id = req.params.id;
    const index = cancionesNuevas.findIndex((cancion) => cancion.id == id);
    cancionesNuevas.splice(index, 1);
    fs.writeFileSync('./canciones.json', JSON.stringify(cancionesNuevas));
    res.json(cancionesNuevas);
    res.status(200).send('Cancion eliminada con exito');
})

app.put('/canciones/:id', (req, res) => {
    const canciones = fs.readFileSync('./canciones.json', 'utf-8');
    const cancionesNuevas = JSON.parse(canciones);
    const id = req.params.id;
    const index = cancionesNuevas.findIndex((cancion) => cancion.id == id);
    cancionesNuevas[index] = req.body;
    fs.writeFileSync('./canciones.json', JSON.stringify(cancionesNuevas));
    res.json(cancionesNuevas);
    res.status(200).send('Cancion modificada con exito');
})