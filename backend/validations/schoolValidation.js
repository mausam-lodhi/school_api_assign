const { body, query } = require("express-validator");

exports.addSchoolValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("address").notEmpty().withMessage("Address is required"),
	body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Latitude must be a valid float between -90 and 90"),
	body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Longitude must be a valid float between -180 and 180"),
];

exports.listSchoolsValidation = [
	query("latitude").isFloat({ min: -90, max: 90 }).withMessage("Valid latitude is required"),
	query("longitude").isFloat({ min: -180, max: 180 }).withMessage("Valid longitude is required"),
];
