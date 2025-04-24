const {
  selectSubjects,
  fetchSubjectById,
  acceptSubject,
} = require("../models/subjects.model");

exports.getSubjects = (req, res, next) => {
  let { filter_by } = req.query;
  selectSubjects(filter_by)
    .then((subjects) => res.status(200).send({ subjects }))
    .catch((err) => next(err));
};

exports.getSubjectById = (req, res, next) => {
  const { subject_id } = req.params;
  fetchSubjectById(subject_id)
    .then((subject) => {
      res.status(200).send({ subject });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSubject = (req, res, next) => {
  const { subject_name, education_id } = req.body;
  acceptSubject(subject_name, education_id)
    .then((subject) => {
      res.status(201).send({ subject });
    })
    .catch((err) => {
      next(err);
    });
};
