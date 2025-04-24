const { selectGroupById, selectStudyGroups } = require("../models/study_groups.model");

exports.getGroupById = (req, res, next) => {
  const { study_group_id } = req.params;
  selectGroupById(study_group_id)
    .then(({ rows }) => {
      res.status(200).send({ group: rows[0] });
    })
    .catch((err) => next(err));
};

exports.getStudyGroups = (req, res, next) => {
    selectStudyGroups()
    .then(study_groups => res.status(200).send({ study_groups }))
    .catch(err => next(err));
};
