require('dotenv').config()
var express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index.ejs')
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, function(){
    console.log("Server listening on port", process.env.APP_PORT);
})