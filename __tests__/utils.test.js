const { topicsLookup, subjectsLookup, gamesLookup, formatScoreboardGames, formatScoreboardSubjects, formatScoreboardTopics, formatSubjectTopics, formatTopicsSubjects, formatUsersGroup } = require('../db/seeds/utils')

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
                game_id:1,
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
            game_id:1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
        }])
    })
    test('returns correct added key in obj with the id for multiple obj elements', () => {
        const sc = [ {
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
        const games =   [{
            game_id:1,
            game_type: "type1",
            game_name: "game 1",
            subject: "one",
            username: "aclaricoats0",
            topic: "topic 1",
            autoGeneratedCode: "879427",
            created_at: "2023-05-01T00:00:00.000Z",
          },
          {
            game_id:2,
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
        expect(output).toEqual( [ {
            game_id:1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
          },
          {
            game_id:1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
          },
          {
            game_id:2,
            username: "aclaricoats0",
            game_name: "game 2",
            game_type: "type 2",
            topic: "topic 3",
            subject: "three",
            score: { correct: 9, incorrect: 1, time: 95 },
          }])
    })
})
describe('format scoreboard topics',()=>{
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
        const topics=[
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
        const output = formatScoreboardTopics(sc, topics)
        expect(output).toEqual([{
            topic_id:1,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 1",
            subject: "one",
            score: { correct: 8, incorrect: 2, time: 125 },
          },
          {
            topic_id:2,
            username: "aclaricoats0",
            game_name: "game 1",
            game_type: "type 1",
            topic: "topic 2",
            subject: "two",
            score: { correct: 7, incorrect: 3, time: 110 },
          }])
    })
})





