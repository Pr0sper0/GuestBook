var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var http = require("http");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended: false}));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(request, response){
	response.render("index");
});

app.get("/new-entry", function(request, response){
	response.render("new-entry");
});

app.post("/new-entry", function(request, response){
	if (!request.body.title || !request.body.body){
	response.status(400).send("Entries must have title and body! ");
	return;
	}
	entries.push({
		title: request.body.title,
		content: request.body.body,
		published: new Date()
	});
	console.log(entries[0].title + " " + entries[0].content)
	response.redirect("/");
});

app.use(function(request, response){
	response.status(404).render("404");
});

//http.createServer(app).listen(3000, function(){
//	console.log("Guest book app started on port 3000");	
//});





