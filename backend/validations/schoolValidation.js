const { body, query } = require("express-validator");

exports.addSchoolValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a valid string"),
    body("address")
        .notEmpty().withMessage("Address is required")
        .isString().withMessage("Address must be a valid string"),
    body("latitude")
        .notEmpty().withMessage("Latitude is required")
        .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be a valid number between -90 and 90")
        .bail()
        .custom((value) => {
            if (isNaN(value)) throw new Error("Latitude must be a valid number");
            return true;
        }),
    body("longitude")
        .notEmpty().withMessage("Longitude is required")
        .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be a valid number between -180 and 180")
        .bail()
        .custom((value) => {
            if (isNaN(value)) throw new Error("Longitude must be a valid number");
            return true;
        }),
];

exports.listSchoolsValidation = [
    query("name")
        .optional()
        .notEmpty().withMessage("Name cannot be empty if provided")
        .isString().withMessage("Name must be a valid string"),
    query("address")
        .optional()
        .notEmpty().withMessage("Address cannot be empty if provided")
        .isString().withMessage("Address must be a valid string"),
    query("latitude")
        .optional()
        .notEmpty().withMessage("Latitude cannot be empty if provided")
        .isFloat({ min: -90, max: 90 }).withMessage("Valid latitude is required")
        .bail()
        .custom((value) => {
            if (isNaN(value)) throw new Error("Latitude must be a valid number");
            return true;
        }),
    query("longitude")
        .optional()
        .notEmpty().withMessage("Longitude cannot be empty if provided")
        .isFloat({ min: -180, max: 180 }).withMessage("Valid longitude is required")
        .bail()
        .custom((value) => {
            if (isNaN(value)) throw new Error("Longitude must be a valid number");
            return true;
        }),
];
