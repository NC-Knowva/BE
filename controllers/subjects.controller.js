const { selectSubjects, fetchSubjectById } = require("../models/subjects.model");

exports.getSubjects = (req, res, next) => {
    selectSubjects()
        .then(subjects => res.status(200).send({ subjects }))
        .catch(err => next(err));
};

exports.getSubjectById = (req, res, next) => {
    const { subject_id } = req.params
    fetchSubjectById(subject_id)
        .then((subject) => {
            res.status(200).send({ subject })
        })
        .catch((err) => {
            next(err)
        })
}