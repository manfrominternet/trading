const express = require('express')
const port = 3000
const routes = require('./routes/index');

const app = express()

app.use('/', routes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))