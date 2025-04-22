const { selectSubjects } = require("../models/subjects.model");

exports.getSubjects = (req, res, next) => {
  let { filter_by } = req.query;
  selectSubjects()
    .then((subjects) => res.status(200).send({ subjects }))
    .catch((err) => next(err));
};

