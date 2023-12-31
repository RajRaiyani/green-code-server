const QuestionService = require('./question.service');

exports.create = async (req, res, next) => {
  try {
    const question = await QuestionService.create({ ...req.body, user: req.userId });
    return res.status(200).json(question);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const questions = await QuestionService.list(req.query);
    return res.status(200).json(questions);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await QuestionService.update(req.params.id, req.body);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
