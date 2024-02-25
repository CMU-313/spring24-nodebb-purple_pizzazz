'use strict';

const user = require('../../user');
const topics = require('../../topics');

module.exports = function (SocketTopics) {
    // When markAsAnsweredForAll button is pressed and emitted to socket.io,
    // the listening function calls this function which checks that this is
    // an admin first, and calls the markAsAnsweredForAll routine, in
    // src/topics/answered.js file
    SocketTopics.markAsAnsweredForAll = async function (socket, tids) {
        if (!Array.isArray(tids)) {
            throw new Error('[[error:invalid-tid]]');
        }

        if (socket.uid <= 0) {
            throw new Error('[[error:no-privileges]]');
        }
        const isAdmin = await user.isAdministrator(socket.uid);
        await Promise.all(tids.map(async (tid) => {
            const topicData = await topics.getTopicFields(tid, ['tid', 'cid']);
            if (!topicData.tid) {
                throw new Error('[[error:no-topic]]');
            }
            const isInst = await user.isInstructor(socket.uid);
            if (!isAdmin && !isInst) {
                throw new Error('[[error:no-privileges]]');
            }
            console.log('in markAsAnsweredForAll with tid = ' + tid.toString());
            await topics.markAsAnsweredForAll(tid);
        }));
    };
};
