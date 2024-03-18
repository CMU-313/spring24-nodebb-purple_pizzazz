
'use strict';

const db = require('../database');

let num : number = "hi";

module.exports = function (Topics) {
    // This function sets the answered field to 1 to indicate that
    // the question has been answered for all
    // It returns nothing.
    Topics.markAsAnsweredForAll = async function (tid) {
        const cid = await Topics.getTopicField(tid, 'cid');

        // 1 means the topic has been answered, 0 means not answered
        await Topics.setTopicField(tid, 'answered', 1);

        // Adds this topic to the appropriate sorted set.
        await db.sortedSetAdd(`cid:${cid}:tids:answered`, 1, tid); // For sorting
    };
};
