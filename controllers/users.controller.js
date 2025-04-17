const { selectUsers, selectUserByUsername } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
    selectUsers()
    .then(users => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    selectUserByUsername(username)
    .then(({ rows }) => {
        console.log(rows);
        res.status(200).send({ user: rows[0] });
      })
    .catch(err => next(err));
};