
exports.topicsLookup = (topics) => {
    if (topics.length === 0) {
        return {}
    }
    const res = {}

    for (let i = 0; i < topics.length; i++) {
        res[topics[i].topic_name] = topics[i].topic_id
    }
    return res
}

exports.subjectsLookup = (subjects) => {
    if (subjects.length === 0) {
        return {}
    }
    const res = {}

    for (let i = 0; i < subjects.length; i++) {
        res[subjects[i].subject_name] = subjects[i].subject_id
    }
    return res
}

exports.gamesLookup = (games) => {
    if (games.length === 0) {
        return {}
    }
    const res = {}

    for (let i = 0; i < games.length; i++) {
        res[games[i].game_name] = games[i].game_id
    }
    return res
}

exports.groupsLookup = (groups) => {
    if (groups.length === 0) {
        return {}
    }
    const res = {}

    for (let i = 0; i < groups.length; i++) {
        res[groups[i].study_group] = groups[i].group_id
    }
    return res
}

exports.formatScoreboardGames=(scoreboard,games)=>{
    if(games.length===0){
        return []
    }
    const scoreboardCopy=[...scoreboard]
    const gamesCopy=[...games]
    const formattedData=[]
    const lookupObj= this.gamesLookup(gamesCopy)

    for (let i=0;i<scoreboardCopy.length;i++){
        const sc= scoreboardCopy[i]
        sc.game_id= lookupObj[sc.game_name]
        formattedData.push(sc)
    }
    return formattedData
}

exports.formatScoreboardTopics=(scoreboard,topics)=>{
    if(topics.length===0){
        return []
    }
    const scoreboardCopy=[...scoreboard]
    const topicsCopy=[...topics]
    const formattedData=[]
    const lookupObj= this.topicsLookup(topicsCopy)

    for (let i=0;i<scoreboardCopy.length;i++){
        const sc= scoreboardCopy[i]
        sc.topic_id= lookupObj[sc.topic]
        formattedData.push(sc)
    }
    return formattedData
}

exports.formatScoreboardSubjects=(scoreboard,subjects)=>{
    if(subjects.length===0){
        return []
    }
    const scoreboardCopy=[...scoreboard]
    const subjectsCopy=[...subjects]
    const formattedData=[]
    const lookupObj= this.subjectsLookup(subjectsCopy)

    for (let i=0;i<scoreboardCopy.length;i++){
        const sc= scoreboardCopy[i]
        sc.subject_id= lookupObj[sc.subject]
        formattedData.push(sc)
    }
    return formattedData
}

exports.formatTopicsSubjects=(topics,subjects)=>{
    if(subjects.length===0){
        return []
    }
    const topicsCopy=[...topics]
    const subjectsCopy=[...subjects]
    const formattedData=[]
    const lookupObj= this.subjectsLookup(subjectsCopy)

    for (let i=0;i<topicsCopy.length;i++){
        const sc= topicsCopy[i]
        sc.subject_id= lookupObj[sc.subject]
        formattedData.push(sc)
    }
    return formattedData
}

exports.formatUsersGroup=(users,groups)=>{
    if(groups.length===0){
        return []
    }
    const usersCopy=[...users]
    const groupsCopy=[...groups]
    const formattedData=[]
    const lookupObj= this.groupsLookup(groupsCopy)
    console.log(lookupObj)

    for (let i=0;i<usersCopy.length;i++){
        const sc= usersCopy[i]
        sc.group_id= lookupObj[sc.group]
        formattedData.push(sc)
    }
    return formattedData
}

exports.formaCardPackTopics=(subjects,topics)=>{
    if(topics.length===0){
        return []
    }
    const subjectsCopy=[...subjects]
    const topicsCopy=[...topics]
    const formattedData=[]
    const lookupObj= this.topicsLookup(topicsCopy)

    for (let i=0;i<subjectsCopy.length;i++){
        const sc= subjectsCopy[i]
        sc.topic_id= lookupObj[sc.topic]
        formattedData.push(sc)
    }
    return formattedData
}




