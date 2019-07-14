const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require('path');
const router = express.Router();
var val="";
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/src')));
router.get('/',function(req,res){
  res.render('index.ejs');
  //__dirname : It will resolve to your project folder.
});
//add the router
app.use('/', router);
const port = process.env.PORT ||8080;
server.listen(port, function(){
  console.log(`App is listening on port ${port}`);
});1
io.on("connection", function(socket) {
    socket.on("send message", function(sent_msg, callback) {
        sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
});

function getCurrentDate() {
    var currentDate = new Date();
    var day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
    var month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
    var year = currentDate.getFullYear();
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    var second = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
