const fs = require('fs');

const cryptidRouter = require('express').Router()

cryptidRouter.get('/', (req, res) => {
    const rawCryptids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCryptids)
  
    res.render('cryptids/index', { cryptids })
})

cryptidRouter.get('/new', (req, res) => {
    res.render('cryptids/new')
})

cryptidRouter.get('/:id', (req, res) => {
    const rawCryptids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCryptids)
    const id = parseInt(req.params.id) - 1
    const cryptid = cryptids[id]
  
    res.render('cryptids/show', { cryptid })
})

cryptidRouter.post('/', (req, res) => {
    const newCryptid = req.body
    const rawCryptids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCryptids)
    cryptids.push(newCryptid)
  
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
  
    res.redirect('/cryptids')
})

cryptidRouter.get('/search/:searchTerm', (req, res) => {
    const rawcryptids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawcryptids)
    const searchTerm = req.params.searchTerm

    const filteredCryptids = cryptids.filter((cryptid) => cryptid.name.toLowerCase() === searchTerm.toLowerCase())
  
    console.log(searchTerm);
    console.log(cryptids);
    console.log(filteredCryptids);
  
    res.render('cryptids/index', { cryptids: filteredCryptids })
})

module.exports = cryptidRouter

