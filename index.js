const app = require('express')()
const layouts = require('express-ejs-layouts');

const dinoRouter = require('./controllers/dinoController')

app.set('view engine', 'ejs')
app.use(layouts);

app.get('/', (req,res) => {
    res.render('dinosaurs/index')
})

app.use('/dinosaurs', dinoRouter)

app.listen(8000, () => {
    console.log('server started!')
})