const { topicsLookup, subjectsLookup, gamesLookup, formatScoreboardGames, formatScoreboardSubjects, formatScoreboardTopics, formaCardPackTopics, formatTopicsSubjects, formatUsersGroup, groupsLookup } = require('../db/seeds/utils')

describe('topics lookup', () => {
    test('returns empty object if input array is empty', () => {
        const input = []
        const output = topicsLookup(input)
        expect(output).toEqual({})
    })
    test('returns correct object for input array with a single object element', () => {
        const input = [
            {
                topic_id: 1,
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            }]
        const output = topicsLookup(input)
        expect(output).toEqual({ "topic 1": 1 })

    })
    test('returns correct object for input array with multiple object elements ', () => {
        const input = [
            {
                topic_id: 1,
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                topic_id: 2,
                topic_name: "topic 2",
                education: "2",
                subject: "two",
            },
            {
                topic_id: 3,
                topic_name: "topic 3",
                education: "1",
                subject: "three",
            }]
        const output = topicsLookup(input)
        expect(output).toEqual({
            "topic 1": 1,
            "topic 2": 2,
            "topic 3": 3
        })
    })
})

describe('subjects lookup', () => {
    test('returns empty object if input array is empty', () => {
        const input = []
        const output = subjectsLookup(input)
        expect(output).toEqual({})
    })
    test('returns correct object for input array with a single object element', () => {
        const input = [
            {
                subject_id: 1,
                subject_name: "topic 1",
                education: "1",
                subject: "one",
            }]
        const output = subjectsLookup(input)
        expect(output).toEqual({ "topic 1": 1 })

    })
    test('returns correct object for input array with multiple object elements ', () => {
        const input = [
            {
                subject_id: 1,
                subject_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                subject_id: 2,
                subject_name: "topic 2",
                education: "2",
                subject: "two",
            },
            {
                subject_id: 3,
                subject_name: "topic 3",
                education: "1",
                subject: "three",
            }]
        const output = subjectsLookup(input)
        expect(output).toEqual({
            "topic 1": 1,
            "topic 2": 2,
            "topic 3": 3
        })
    })
})
describe('games lookup', () => {
    test('returns empty object if input array is empty', () => {
        const input = []
        const output = gamesLookup(input)
        expect(output).toEqual({})
    })
    test('returns correct object for input array with a single object element', () => {
        const input = [
            {
                game_id: 1,
                game_name: "topic 1",
                education: "1",
                subject: "one",
            }]
        const output = gamesLookup(input)
        expect(output).toEqual({ "topic 1": 1 })

    })
    test('returns correct object for input array with multiple object elements ', () => {
        const input = [
            {
                game_id: 1,
                game_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                game_id: 2,
                game_name: "topic 2",
                education: "2",
                subject: "two",
            },
            {
                game_id: 3,
                game_name: "topic 3",
                education: "1",
                subject: "three",
            }]
        const output = gamesLookup(input)
        expect(output).toEqual({
            "topic 1": 1,
            "topic 2": 2,
            "topic 3": 3
        })
    })
})
describe('group lookup', () => {
    test('it returns group name key with its id', () => {
        const input = [{
            group_id: 1,
            study_group: "Colobus",
            admins: ["eforgan9"],
            users: [
                "tfolbigg3",
                "lgurrado4",
                "acranham7",
                "eforgan9",
                "ktrevaskiss6",
                "ogladyer1",
                "egirardini5",
                "ggrishinov2",
            ],
            topic_id: 6,
            avatar_img_url:
                "https://robohash.org/voluptateestmagnam.png?size=50x50&set=set1",
            created_at: "2023-10-04T00:00:00.000Z",
        },
        {
            group_id: 2,
            study_group: "Bird",
            admins: ["eforgan9"],
            users: [
                "aclaricoats0",
                "ogladyer1",
                "klease8",
                "ktrevaskiss6",
                "eforgan9",
                "lgurrado4",
                "acranham7",
                "ggrishinov2",
                "egirardini5",
            ],
            topic_id: 4,
            avatar_img_url:
                "https://robohash.org/etminimaoccaecati.png?size=50x50&set=set1",
            created_at: "2023-11-04T00:00:00.000Z",
        }]
        const output = groupsLookup(input)
        expect(output).toEqual(
            {
                'Colobus': 1,
                'Bird': 2
            }
        )
    })
})

describe('formatScoreboardGames', () => {
    test('returns empty array if array is empty', () => {
        const sc = [{
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        }]
        const games = []
        const output = formatScoreboardGames(sc, games)
        expect(output).toEqual([])
    })
    test('returns correct added key in obj with the id', () => {
        const sc = [{
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        }]
        const games = [
            {
                game_id: 1,
                game_type: "type1",
                game_name: "game 1",
                subject: "one",
                username: "aclaricoats0",
                topic: "topic 1",
                autoGeneratedCode: "879427",
                created_at: "2023-05-01T00:00:00.000Z",
            }
        ];
        const output = formatScoreboardGames(sc, games)
        expect(output).toEqual([{
            game_id: 1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        }])
    })
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const sc = [{
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        },
        {
            username: "aclaricoats0",
            game_name: "game 2",
            game_type: "type 2",
            topic: "topic 3",
            subject: "three",
            score: { correct: 9, incorrect: 1, time: 95 },
        }]
        const games = [{
            game_id: 1,
            game_type: "type1",
            game_name: "game 1",
            subject: "one",
            username: "aclaricoats0",
            topic: "topic 1",
            autoGeneratedCode: "879427",
            created_at: "2023-05-01T00:00:00.000Z",
        },
        {
            game_id: 2,
            game_type: "type2",
            game_name: "game 2",
            subject: "two",
            username: "ogladyer1",
            topic: "topic 2",
            autoGeneratedCode: "398247",
            created_at: "2023-05-02T00:00:00.000Z",
        }
        ];
        const output = formatScoreboardGames(sc, games)
        expect(output).toEqual([{
            game_id: 1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            game_id: 1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        },
        {
            game_id: 2,
            username: "aclaricoats0",
            game_name: "game 2",
            game_type: "type 2",
            topic: "topic 3",
            subject: "three",
            score: { correct: 9, incorrect: 1, time: 95 },
        }])
    })
})
describe('format scoreboard topics', () => {
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const sc = [{
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        }]
        const topics = [
            {
                topic_id: 1,
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                topic_id: 2,
                topic_name: "topic 2",
                education: "2",
                subject: "two",
            }
        ]
        const output = formatScoreboardTopics(sc, topics)
        expect(output).toEqual([{
            topic_id: 1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            topic_id: 2,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        }])
    })
})

describe('format scoreboard subjects!!', () => {
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const sc = [{
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        }]
        const subjects = [
            { subject_id: 1, subject_name: "one", education: '1' },
            { subject_id: 2, subject_name: "two", education: '1' }
        ]
        const output = formatScoreboardSubjects(sc, subjects)
        expect(output).toEqual([{
            subject_id: 1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        },
        {
            subject_id: 2,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
        }])
    })
})

describe('format TOPICS subjects!!', () => {
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const sc = [
            {
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                topic_name: "topic 2",
                education: "2",
                subject: "two",
            }]

        const subjects = [
            { subject_id: 1, subject_name: "one", education: '1' },
            { subject_id: 2, subject_name: "two", education: '1' }
        ]
        const output = formatTopicsSubjects(sc, subjects)
        expect(output).toEqual([
            {
                subject_id: 1,
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                subject_id: 2,
                topic_name: "topic 2",
                education: "2",
                subject: "two",
            }])
    })
})
describe('format USERS groups!!', () => {
    test('returns correct added key in obj with the id for multiple obj elements', () => {

        const sc = [
            {
                username: "tfolbigg3", group: "Colobus",
                role: "member"
            },
            { username: "lgurrado4", group: "Bird", role: "member" }]

        const groups = [
            {
                group_id: 1,
                study_group: "Colobus",
                admins: ["eforgan9"],
                users: [
                    "tfolbigg3",
                    "lgurrado4",
                    "acranham7",
                    "eforgan9",
                    "ktrevaskiss6",
                    "ogladyer1",
                    "egirardini5",
                    "ggrishinov2",
                ],
                topic_id: 6,
                avatar_img_url:
                    "https://robohash.org/voluptateestmagnam.png?size=50x50&set=set1",
                created_at: "2023-10-04T00:00:00.000Z",
            },
            {
                group_id: 2,
                study_group: "Bird",
                admins: ["eforgan9"],
                users: [
                    "aclaricoats0",
                    "ogladyer1",
                    "klease8",
                    "ktrevaskiss6",
                    "eforgan9",
                    "lgurrado4",
                    "acranham7",
                    "ggrishinov2",
                    "egirardini5",
                ],
                topic_id: 4,
                avatar_img_url:
                    "https://robohash.org/etminimaoccaecati.png?size=50x50&set=set1",
                created_at: "2023-11-04T00:00:00.000Z",
            }
        ]
        const output = formatUsersGroup(sc, groups)
        expect(output).toEqual([{
            group_id: 1,
            username: "tfolbigg3", group: "Colobus", role: "member"
        },
        {
            group_id: 2,
            username: "lgurrado4", group: "Bird", role: "member"
        }])
    })
})

describe('format card pack topics!!', () => {
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const topics = [
            {
                topic_id:1,
                topic_name: "topic 1",
                education: "1",
                subject: "one",
            },
            {
                topic_id:2,
                topic_name: "topic 2",
                education: "2",
                subject: "two",
            }
        ]
        const card = [
            {
                username: "aclaricoats0",
                topic: 'topic 1',
                name: "Topic 1 Card Pack",
                description:
                    "A set of study cards for topic 1 covering fundamental concepts.",
                education: "2",
                visibility: true,
                questions: [
                    {
                        Q1: "Question 1 for topic 1",
                        A1: "Answer 1 for topic 1"
                    },
                    {
                        Q2: "Question 2 for topic 1",
                        A2: "Answer 2 for topic 1"
                    },
                    {
                        Q3: "Question 3 for topic 1",
                        A3: "Answer 3 for topic 1"
                    }
                ]
            },
            {
                username: "ogladyer1",
                topic: "topic 2",
                name: "Topic 2 Card Pack",
                description:
                    "A set of study cards for topic 2 covering key concepts and ideas.",
                education: "1",
                visibility: true,
                questions: [
                    {
                        Q1: "Question 1 for topic 1",
                        A1: "Answer 1 for topic 1"
                    },
                    {
                        Q2: "Question 2 for topic 1",
                        A2: "Answer 2 for topic 1"
                    },
                    {
                        Q3: "Question 3 for topic 1",
                        A3: "Answer 3 for topic 1"
                    }
                ]
            }
        ]
        const output = formaCardPackTopics(card, topics)
        expect(output).toEqual(
            [
                {
                    topic_id:1,
                    username: "aclaricoats0",
                    topic: 'topic 1',
                    name: "Topic 1 Card Pack",
                    description:
                        "A set of study cards for topic 1 covering fundamental concepts.",
                    education: "2",
                    visibility: true,
                    questions: [
                        {
                            Q1: "Question 1 for topic 1",
                            A1: "Answer 1 for topic 1"
                        },
                        {
                            Q2: "Question 2 for topic 1",
                            A2: "Answer 2 for topic 1"
                        },
                        {
                            Q3: "Question 3 for topic 1",
                            A3: "Answer 3 for topic 1"
                        }
                    ]
                },
                {
                    topic_id:2,
                    username: "ogladyer1",
                    topic: "topic 2",
                    name: "Topic 2 Card Pack",
                    description:
                        "A set of study cards for topic 2 covering key concepts and ideas.",
                    education: "1",
                    visibility: true,
                    questions: [
                        {
                            Q1: "Question 1 for topic 1",
                            A1: "Answer 1 for topic 1"
                        },
                        {
                            Q2: "Question 2 for topic 1",
                            A2: "Answer 2 for topic 1"
                        },
                        {
                            Q3: "Question 3 for topic 1",
                            A3: "Answer 3 for topic 1"
                        }
                    ]
                }
            ]
        )
    })
})































