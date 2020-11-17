const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const dinoRouter = require('./controllers/dinoController');
const cryptidRouter = require('./controllers/cryptidController');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.send('Hello!');
})

app.use('/dinosaurs', dinoRouter);
app.use('/cryptids', cryptidRouter);

app.listen(8000, () => {
    console.log('server started!');
})