const { selectUsers, selectUserByUsername, selectMessagesByUsername, selectStudyGroupsByUsername, insertUser, updateUser, fetchUserFriends, deleteUser } = require("../models/users.model");

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

exports.getUserFriends = (req, res, next) => {
    const { username } = req.params
    fetchUserFriends(username).then((friends) => {
        res.status(200).send({ friends })
    })
}

exports.postUser = (req, res, next) => {
    const { username, name, avatar_img_url, education_id } = req.body;

    insertUser(username, name, avatar_img_url, education_id)
        .then(user => res.status(201).send({ user }))
        .catch(err => next(err));
};

exports.patchUserByUsername = (req, res, next) => {
    const { username } = req.params;
    const { name, avatar_img_url, education_id } = req.body;

    updateUser(username, name, avatar_img_url, education_id)
        .then(user => res.status(200).send({ user }))
        .catch(err => next(err));
};

exports.deleteUserByUsername = (req, res, next) => {
    const { username } = req.params;

    deleteUser(username)
    .then(() => res.status(204).send())
    .catch(err => next(err));
};
