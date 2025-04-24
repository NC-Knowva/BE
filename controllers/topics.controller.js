const { selectTopics, insertTopic, selectTopicById } = require("../models/topics.model");

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

exports.getTopicById = (req, res, next) => {
    const { topic_id } = req.params;
    selectTopicById(topic_id)
    .then(({ rows }) => {
        res.status(200).send({ topic: rows[0] });
      })
    .catch(err => next(err));
};