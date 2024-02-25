
'use strict';

module.exports = function (Topics) {
    // This function sets the answered field to 1 to indicate that
    // the question has been answered for all
    Topics.markAsAnsweredForAll = async function (tid) {
        // const thisUser = user.getUserFields(uid, ['username', 'userslug']),
        // const cid = await Topics.getTopicField(tid, 'cid');
        // 1 means it has been answered, 0 means not answered
        Topics.setTopicField(tid, 'answered', 1);
    };
};
