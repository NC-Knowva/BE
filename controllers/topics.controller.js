const { selectTopics, insertTopic } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then(topics => res.status(200).send({ topics }))
    .catch(err => next(err));
};

exports.postTopic = (req, res, next) => {
    const { topic_name, education_id, subject_id } = req.body;

    insertTopic(topic_name, education_id, subject_id)
    .then(topic => res.status(201).send({ topic }))
    .catch(err => next(err));
};