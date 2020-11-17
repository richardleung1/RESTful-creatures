const dinoRouter = require('express').Router();
const fs = require('fs');

function readDinos() {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(dinoData);
    return dinos;
}

dinoRouter.get('/', (req, res) => {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    let dinos = JSON.parse(dinoData);

    const dinoFilter = req.query.dinoFilter;
    if (dinoFilter && dinoFilter !== 'all') {
        dinos = dinos.filter(function(dino) {
            if (dino.name.toLowerCase() === dinoFilter.toLowerCase()) {
                return true;
            } else if (dino.type.toLowerCase() === dinoFilter.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        });
    }

    res.render('dinosaurs/index', { dinos });
});

dinoRouter.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

dinoRouter.get('/edit/:id', (req, res) => {
    let dinos = readDinos();
    let index = req.params.id;
    let dino = dinos[index];
    res.render('dinosaurs/edit', { dino, index });
})

dinoRouter.get('/:id', (req, res) => {
    const dinos = readDinos()
    const index = parseInt(req.params.id);
    const dino = dinos[index];
    res.render('dinosaurs/show', { dino });

})

dinoRouter.delete('/:id', (req, res) => {
    const dinos = readDinos();
    dinos.splice(req.params.id, 1);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinosaurs');
})

dinoRouter.post('/', (req, res) => {
    const dinos = readDinos()
    const newDino = req.body;
    dinos.push(newDino);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinosaurs');
})

dinoRouter.put('/:id', (req, res) => {
    const dinos = readDinos();
    const changedDino = req.body;
    dinos[req.params.id] = changedDino;
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinosaurs');
})

module.exports = dinoRouter;