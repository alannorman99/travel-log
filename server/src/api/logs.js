const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		message: '🌎',
	});
});

router.post('/', async (req, res, next) => {
	try {
		const logEntry = new LogEntry(req.body);
		const createEntry = await logEntry.save();
		res.json(createEntry);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

