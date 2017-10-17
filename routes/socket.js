'use strict';

var _ = require('lodash');

var utils = require('../utils');

var fakeLatitudeBounds = {min: 0, max: 1};
var fakeLongitudeBounds = {min: 0, max: 1};
var fakeFloorBounds = {min: 0, max: 3};

function sendFakePositionTo(userId) {
    utils.sendIndoorLocationTo({
        latitude: _.random(fakeLatitudeBounds.min, fakeLatitudeBounds.max, true),
        longitude: _.random(fakeLongitudeBounds.min, fakeLongitudeBounds.max, true),
        floor: _.random(fakeFloorBounds.min, fakeFloorBounds.max),
        timestamp: Date.now(),
        accuracy: 1
    }, userId);
}

module.exports = function (socket) {
    utils.log(1, 'socket on "connection"', {
        id: socket.id
    });

    socket.userId = _.get(socket, 'handshake.query.userId', null);

    if (!socket.userId || socket.userId === 'notExist') {
        socket.emit('error', new Error('User id not exist'));
        socket.disconnect(true);
    }
    else {
        var fakeIndoorLocationInterval = setInterval(function () {
            sendFakePositionTo(socket.userId);
        }, 2000);
        sendFakePositionTo(socket.userId);
    }

    socket.on('disconnect', function () {
        utils.log(1, 'socket on "disconnect"', {
            id: socket.id
        });

        clearInterval(fakeIndoorLocationInterval);
    });
};