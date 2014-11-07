var async = require('async');
var Db = require('tingodb')({}).Db;

exports.uri = './data';

exports.db = new Db(exports.uri, {});

exports.each = function (fixture, fn, done) {
    async.each(fixture, function (args, callback) {
        fn.apply(undefined, args.concat([callback]));
    }, done);
};

exports.flushWorker = function (worker, done) {
    worker.start();
    worker.once('empty', function () {
        worker.stop(done);
    });
};