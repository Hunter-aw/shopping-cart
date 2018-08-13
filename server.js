const express = require('express');
let app = express()
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
console.log("server is runnin runnin and runnin runnin")
app.listen(8008)     