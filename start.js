const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require('path');
const router = express.Router();
let val="";

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/src')));
router.get('/',function(req,res){
  res.render('index.ejs');
});
//add the router
app.use('/', router);
const port = process.env.PORT ||8080;
server.listen(port, function(){
  console.log(`App is listening on port ${port}`);
});
//Socket connection
io.on("connection", function(socket) {
    socket.on("send message", function(sent_msg, callback) {
        sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
});
//GEtting current date for displaying message
function getCurrentDate() {
    const currentDate = new Date();
    const day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
    const month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    const minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    const second = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
