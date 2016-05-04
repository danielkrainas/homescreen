#!/usr/bin/env node

var app = require('child_process').spawn('node', [__dirname + '/../node_modules/.bin/nw', __dirname + '/..'], {
	stdio: 'inherit',
	shell: true
});

/*app.stdout.on('data', function (data) {
	console.log(data);
});*/

app.on('close', function () {});

app.on('error', function (err) {
	console.error(`error: ${err}`);
});