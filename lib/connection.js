var job = require('./job');
var Queue = require('./queue');
var Worker = require('./worker');
var Db = require('tingodb')({}).Db;

module.exports = Connection;

function Connection(uri, options) {
    options = options | {};
    this.db = new Db(uri, options);
}

Connection.prototype.worker = function (queues, options) {
    var self = this;

    var queues = queues.map(function (queue) {
        if (typeof queue === 'string') {
            queue = self.queue(queue);
        }

        return queue;
    });

    return new Worker(queues, options);
};

Connection.prototype.queue = function (name, options) {
    return new Queue(this, name, options);
};

Connection.prototype.close = function () {
    this.db.close();
};