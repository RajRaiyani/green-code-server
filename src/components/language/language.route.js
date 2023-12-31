const express = require('express');
const { validate } = require('express-validation');
const { isSuperuser } = require('../../middlewares/auth');
const LanguageController = require('./language.controller');
const LanguageValidation = require('./language.validation');

const router = express.Router();

router.route('/')
  .get(LanguageController.list)
  .post(isSuperuser, validate(LanguageValidation.create), LanguageController.create);

router.route('/:id')
  .put(validate(LanguageValidation.update), LanguageController.update)
  .delete(validate(LanguageValidation.delete), LanguageController.delete);

module.exports = router;
