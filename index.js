// var fs = require('fs')
// var https = require('https')
// 如果不需要用 https 的話，要改成引用 http 喔
var http = require('http')
var socketio = require('socket.io')

//https 的一些設定，如果不需要使用 ssl 加密連線的話，把內容註解掉就好
var options = {
    // key: fs.readFileSync('這個網域的 ssl key 位置'),
    // cert: fs.readFileSync('這個網域的 ssl fullchain 位置')
}

//http & socket port
var server = http.createServer(options);
server.listen(4040)
var io = socketio(server);
console.log("Server socket 4040 , api 4000")

//api port
var app = require('express')();
var port = 4000;
app.listen(port, function () {
    console.log('API listening on *:' + port);
});

//用 api 方式取得，應用程式對指向根 URL (/) 或路由的要求，req（要求）和 res（回應）
app.get('/api/messages', function (req, res) {
    let messages = 'hellow world'
    // res.sendFile( __dirname + '/index.html');
    res.send(messages);
})

let messages = [
    {
        name: "Major",
        message: "Welcome!"
    }
];

//用 socket 方法建立連線
io.on('connection', function(socket){
    console.log('user connected')

     // 發送之前的全部訊息
    io.emit("allMessage", messages);

    // 建立一個 "sendMessage" 的監聽
    socket.on("sendMessage", function(message){
        console.log(message);
        messages.push(message);
        io.emit("newMessage", message);
    }) 
})

// const express = require('express');
// const app  = express();
// const port = 4040;

// const http = require('http')
// const option = {

// }

// let server = http.createServer(option);
// server.listen(4040);

// app.listen(port, function(){
//     console.log('app listen :'+port);
// })

// app.get("/", function(req, res){
//     res.send('Hello World 2')
// })
