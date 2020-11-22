const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
	origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: "Hello World"
	});
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

//error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`Listening on localhost:${port}`);
});
