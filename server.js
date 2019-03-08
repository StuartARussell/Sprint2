currentInput = [];
assignedKey = ['W','A','S','D'];
clientTracker = 0;
let path = []; 

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(heartbeat, 99);
setInterval(clearInput, 500);

function clearInput(){
    currentInput = [];
}
function heartbeat() {
    if(currentInput.length==1){
        io.sockets.emit('heartbeat', currentInput[0]);
    }
    //currentInput = [];
}




// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {

    console.log("We have a new client: " + socket.id);
    io.to(`${socket.id}`).emit('assignKey', assignedKey[clientTracker]); //Message to specific user
    //io.sockets.emit('assignKey', assignedKey[clientTracker]);
    console.log(assignedKey[clientTracker]);
    clientTracker += 1;
    if (clientTracker > 3){
      clientTracker = 0;
    }

    
    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });

    socket.on('W', function(){
        // console.log("REICEVED W FROM CLIENT");
        // currentInput.push('W');
        if(!currentInput.includes('W')){
            currentInput.push('W');
            console.log('Pushed W');
            console.log(currentInput);
        }

    });
    socket.on('A', function(){
        // console.log("REICEVED A FROM CLIENT");     
        // currentInput.push('A'); 
        if(!currentInput.includes('A')){
            currentInput.push('A');
            console.log('Pushed A');
            console.log(currentInput);
        }
    });
    socket.on('S', function(){
        // console.log("REICEVED S FROM CLIENT");
        // currentInput.push('S');
        if(!currentInput.includes('S')){
            currentInput.push('S');
            console.log('Pushed S');
            console.log(currentInput);
        }
    });
    socket.on('D', function(){
        // console.log("REICEVED D FROM CLIENT");
        // currentInput.push('D');
        if(!currentInput.includes('D')){
            currentInput.push('D');
            console.log('Pushed D');
            console.log(currentInput);
        }
    });

    socket.on('moved', function(data){
      console.log(data);
      console.log(data.x);
      console.log(data.y);
      console.log(path);
      path.push([data.x, data.y]);
    });
}
);