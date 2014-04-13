// Setup server.
var restify = require('restify');
var fs = require('fs');

var server = restify.createServer({ name: 'ChrisPeplar'});

// Start server.
server.listen(7070, '127.0.0.1', function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

// Serve static files.
server.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './public/admin'
}));

// Save posted data
server.post('/edit', function (req, res, next) {

	console.log(req.params);

	var text = req.params;

	fs.writeFile("/text.txt", text, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	});

});