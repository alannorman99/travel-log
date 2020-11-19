const express = require('express');

const app = express();

const port = process.env.PORT || 5050;

app.listen(port, () => {
console.log("Listening on localhost:5050");
})