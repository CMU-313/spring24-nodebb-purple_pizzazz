'use strict';

module.exports = function (Posts) {
    Posts.makeAnonymous = async function (pid) {
        console.log('src/posts/anonymize');
        return await Posts.setPostField(pid, 'anonymous', 1);
    };
    Posts.makeUnanonymous = async function (pid) {
        return await Posts.setPostField(pid, 'anonymous', 0);
    };
};
