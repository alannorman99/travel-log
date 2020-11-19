const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');


const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
	origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
	res.json({
		message: "Hello World"
	});
});

app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	//next forwards to next middleware unless passed an error then it forwards to an error handler
	next(error);
});

//error handler
app.use((error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		//process.env.NODE_ENV makes it so stack traces aren't displayed if the app is in production
		stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
	});
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
console.log("Listening on localhost:5050");
});
