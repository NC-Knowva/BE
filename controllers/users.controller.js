const { selectUsers, selectUserByUsername, selectMessagesByUsername, selectStudyGroupsByUsername } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
    selectUsers()
    .then(users => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    selectUserByUsername(username)
    .then(({ rows }) => {
        res.status(200).send({ user: rows[0] });
      })
    .catch(err => next(err));
};

exports.getMessagesByUsername = (req, res, next) => {
    const { username } = req.params;
    selectMessagesByUsername(username)
    .then(({ rows }) => {
        res.status(200).send({ messages: rows })
    })
    .catch(err => next(err));
};

exports.getStudyGroupsByUsername = (req, res, next) => {
    const { username } = req.params;
    selectStudyGroupsByUsername(username)
    .then(({ rows }) => {
        res.status(200).send({ study_groups: rows })
    })
    .catch(err => next(err));
};