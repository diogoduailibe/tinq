tinq
====

Tinq is a TingoDB-backed job queue for Node.js. Initially forked from [Monq](https://github.com/scttnlsn/monq).

Usage
-----

Connect to TingoDB by specifying a valid path:

```javascript
var tinq = require('tinq');
var client = tinq('./data');
```
    
Enqueue jobs by supplying a job name and a set of parameters.  Below, the job `reverse` is being placed into the `example` queue:

```javascript
var queue = client.queue('example');

queue.enqueue('reverse', { text: 'foobar' }, function (err, job) {
    console.log('enqueued:', job.data);
});
```

Create workers to process the jobs from one or more queues.  The functions responsible for performing a job must be registered with each worker:

```javascript
var worker = client.worker(['example']);

worker.register({
    reverse: function (params, callback) {
        try {
            var reversed = params.text.split('').reverse().join('');
            callback(null, reversed);
        } catch (err) {
            callback(err);
        }
    }
});

worker.start();
```

Events
------
    
Workers will emit various events while processing jobs:

```javascript
worker.on('dequeued', function (data) { … });
worker.on('failed', function (data) { … });
worker.on('complete', function (data) { … });
worker.on('error', function (err) { … });
```
    
Install
-------

    npm install tinq
    
Tests
-----

    npm test

License
-----

See LICENSE file.