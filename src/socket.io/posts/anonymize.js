'use strict';

const posts = require('../../posts')

module.exports = function(SocketPosts){
    SocketPosts.makeAnonymous = async function (pid) {
        console.log("posts.makeAnonymous");
        await posts.makeAnonymous(pid)
    }
    SocketPosts.makeUnanonymous = async function (pid) {
        console.log("posts.makeUnanonymous");
        await posts.makeUnanonymous(pid)

    }
}
