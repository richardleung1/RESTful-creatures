const cryptidRouter = require('express').Router();
const fs = require('fs');

function readCryptids() {
    const cryptidData = fs.readFileSync('./cryptids.json');
    const cryptids = JSON.parse(cryptidData);
    return cryptids;
}

cryptidRouter.get('/', (req, res) => {
    let cryptids = readCryptids();

    let cryptidFilter = req.query.cryptidFilter;

    if (cryptidFilter && cryptidFilter !== 'all') {
        cryptids = cryptids.filter(function(cryptid) {
            return (cryptid.name.toLowerCase() === cryptidFilter.toLowerCase());
        });
    }
    res.render('cryptids/index', { cryptids });

})

cryptidRouter.get('/new', (req, res) => {
    res.render('cryptids/new');
})

cryptidRouter.get('/edit/:id', (req, res) => {
    let cryptids = readCryptids();
    let index = req.params.id;
    let cryptid = cryptids[index];
    res.render('cryptids/edit', { cryptid, index });

})

cryptidRouter.get('/:id', (req, res) => {
    const cryptids = readCryptids()
    const index = parseInt(req.params.id);
    const cryptid = cryptids[index];
    res.render('cryptids/show', { cryptid });

})

cryptidRouter.delete('/:id', (req, res) => {
    const cryptids = readCryptids();
    cryptids.splice(req.params.id, 1);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect('/cryptids');
})

cryptidRouter.post('/', (req, res) => {
    const cryptids = readCryptids()
    const newCryptid = req.body;
    cryptids.push(newCryptid);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect('/cryptids');
})

cryptidRouter.put('/:id', (req, res) => {
    const cryptids = readCryptids();
    const changedCryptid = req.body;
    cryptids[req.params.id] = changedCryptid;
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect('/cryptids');
})

module.exports = cryptidRouter;
