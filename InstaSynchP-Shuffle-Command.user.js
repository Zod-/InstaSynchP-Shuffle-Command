// ==UserScript==
// @name        InstaSynchP Shuffle Command
// @namespace   InstaSynchP
// @description Command to shuffle the playlist

// @version     1.0.5
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-Shuffle-Command
// @license     MIT

// @include     *://instasync.com/r/*
// @include     *://*.instasync.com/r/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js?version=37716
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

Shuffle.prototype.execute = function (opts) {
  "use strict";
  var userList = opts.usernames,
    i, video,
    tempList = [],
    all = false,
    playlist = window.room.playlist;

  for (i = 1; i < arguments.length; i += 1) {
    switch (arguments[i]) {
    case 'all':
      all = true;
      break;
    }
  }
  i = all ? 0 : activeVideoIndex() + 1;

  //save all the videos with their index
  for (; i < playlist.videos.length; i += 1) {
    video = playlist.videos[i];
    if (userList.length === 0 || userList.indexOf(video.addedby.toLowerCase()) !== -1) {
      tempList.push({
        i: i,
        info: video.info
      });
    }
  }

  //move the videos to the position of another video in the list
  for (i = 0; i < tempList.length; i += 1) {
    sendcmd('move', {
      info: tempList[i].info,
      position: tempList[Math.floor(Math.random() * tempList.length)].i
    });
  }
};

window.plugins = window.plugins || {};
window.plugins.shuffle = new Shuffle('1.0.5');
