var tinq = require('../lib/index');

var client = tinq('./data');
var queue = client.queue('foo');

queue.enqueue('uppercase', { text: 'bar' }, function (err, job) {
    if (err) throw err;
    console.log('Enqueued:', job.data);
    process.exit();
});