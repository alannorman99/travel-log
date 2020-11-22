const mongoose = require('mongoose');

const { schema } = mongoose;

const requriedNumber = {
	type: Number,
	required: true,
}

const logEntrySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	comments: String,
	image: String,
	rating: {
		type: Number,
		min: 0,
		max: 10,
		default: 0,
	},
	latitude: {
		...requriedNumber,
		min: -90,
		max: 90,
	},
	longitude: {
		...requriedNumber,
		min: -180,
		max: 180,
	},
	visitDate: {
		required: true,
		type: Date,
	},
}, {
	timestamps: true,
});

module.exports = logEntrySchema;