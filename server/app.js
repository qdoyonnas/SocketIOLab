var io = require("socket.io")(process.envPort||3000);

console.log("Server started");

var playerCount = 0;

io.on("connection", function(socket) {
	console.log("client connected");
	
	socket.broadcast.emit("spawnPlayer");
	playerCount++;
	
	for(var i = 0; i < playerCount; i++){
		socket.emit("spawnPlayer");
		console.log("Spawning player " + i)
	}
	
	socket.on("playerHere", function(data) {
		console.log("Player is logged in");
	});
	
	socket.on("disconnect", function() {
		console.log("Player disconnected");
		playerCount--;
	});
});