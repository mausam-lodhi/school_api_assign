const express = require("express");
const { addSchoolValidation, listSchoolsValidation } = require("../validations/schoolValidation");
const { validate } = require("../middleware/validate");
const { addSchool, listSchools } = require("../controllers/schoolController");

const router = express.Router();

router.post("/addSchool", addSchoolValidation, validate, addSchool);
router.get("/listSchools", listSchoolsValidation, validate, listSchools);

module.exports = router;
