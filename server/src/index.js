const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares')

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
	origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
	res.json({
		message: "Hello World"
	});
});

app.use(middlewares.notFound);

//error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log("Listening on localhost:5050");
});
