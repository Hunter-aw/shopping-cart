const express = require('express');
let app = express()
app.listen(8008)
app.use(express.static('public'));
app.use(express.static('node_modules'));     