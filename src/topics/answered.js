
'use strict';

const async = require('async');
const _ = require('lodash');

const db = require('../database');
const user = require('../user');
const posts = require('../posts');
const notifications = require('../notifications');
const categories = require('../categories');
const privileges = require('../privileges');
const meta = require('../meta');
const utils = require('../utils');
const plugins = require('../plugins');

module.exports = function (Topics) {
    Topics.markAsAnsweredForAll = async function (tid) {
        const cid = await Topics.getTopicField(tid, 'cid');
        await db.set(`answered:cid:${cid}:tid:${tid}`, 'yes');
    };

    /*
    Topics.isAnsweredForAll = async function (tid) {
        const cid = await Topics.getTopicField(tid, 'cid');
        const val = await db.get(`answered:cid:${cid}:tid:${tid}`);
        return (val === 'yes');
    };
    */
    
};
