require('dotenv').config()
var express = require('express');
var fs = require('fs');
var multer = require('multer');

const app = express();


app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    console.log();
    res.render('index.ejs')
})

app.get('/source/:id', (req, res, next) => {
    // res.writeHead(200, {'Content-Type': 'video/mp4'})
    // var rs = fs.createReadStream('assets/2.mp4', {
    //     highWaterMark: 64 * 1024
    // });
    
    // rs.pipe(res);
    // rs.on('data', function(chunk){
    //     // console.log(chunk.toString());
    // })
    
    var id = req.params.id;
    const path = `${__dirname}/assets/${id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    console.log(range);
    if(range){
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end, highWaterMark: 255 * 1024});
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": 'bytes',
            "Content-Length": chunksize,
            "Content-Type": 'video/mp4'
        }
        res.writeHead(206, head);
        file.pipe(res);
        file.on('data', function(chunk){
            console.log(chunk.length);
        })
    }
    else{
        const head = {
            "Content-Length": fileSize,
            "Content-Type": 'video/mp4'
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res);
    }
})

app.get('/video', (req, res, next) => {
    var id = req.query.w;
    res.render('video.ejs', {
        id
    })
})

app.get('/stream', (req, res, next) => {
    res.render('stream.ejs')
})

app.get('/watch', (req, res, next) => {
    let id = req.query.id;
    res.render('watch.ejs')
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, function(){
    console.log("Server listening on port", process.env.APP_PORT);
})