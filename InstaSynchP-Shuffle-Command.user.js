// ==UserScript==
// @name        InstaSynchP Shuffle Command
// @namespace   InstaSynchP
// @description Command to shuffle the playlist

// @version     1.0.1
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-Shuffle-Command
// @license     MIT

// @include     http://*.instasynch.com/*
// @include     http://instasynch.com/*
// @include     http://*.instasync.com/*
// @include     http://instasync.com/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js
// ==/UserScript==

function Shuffle(version) {
    "use strict";
    this.version = version;
    this.name = "InstaSynchP Shuffle Command";
    this.commands = {
        "'shuffle": {
            'hasArguments': true,
            'type': 'mod',
            'reference': this,
            'description': 'Shuffles the playlist or a wall of a user. Parameters: the user to shuffle, "all" so that all the videos get shuffled instead of only the ones below the active one',
            'callback': this.execute
        }
    };
}

Shuffle.prototype.execute = function () {
    "use strict";
    var userList = [],
        i,
        tempList = [],
        all = false;

    for (i = 1; i < arguments.length; i += 1) {
        if (arguments[i] === 'all') {
            all = true;
        } else if (isBlackname(arguments[i])) {
            userList.push(arguments[i].toLowerCase());
        }
    }
    i = all ? 0 : activeVideoIndex() + 1;

    //save all the videos with their index
    for (; i < window.playlist.length; i += 1) {
        if (!user || userList.indexOf(window.playlist[i].addedby.toLowerCase()) !== -1) {
            tempList.push({
                i: i,
                info: window.playlist[i].info
            });
        }
    }

    //move the videos to the position of another video in the list
    for (i = 0; i < tempList.length; i += 1) {
        window.global.sendcmd('move', {
            info: tempList[i].info,
            position: tempList[Math.floor(Math.random() * tempList.length)].i
        });
    }
};

window.plugins = window.plugins || {};
window.plugins.shuffle = new Shuffle('1.0.1');
