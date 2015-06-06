<?php
require __DIR__ . '/vendor/autoload.php';
require 'VersionProvider.php';

use Vinelab\Minion\Minion;

$m = new Minion();
echo "nic";
$m->register('VersionProvider');
$m->run();

// 1) SUBSCRIBE to a topic to receive events
$onHello = function ($args) {
    echo "Got event: {$args[0]}\n";
};
$session->subscribe('com.myapp.hello', $onHello);

// 2) PUBLISH an event
$session->publish('com.example.oncounter', array('Hello, world!'));

// 3) REGISTER a procedure for remote calling
$add2 = function ($args) {
    return $args[0] + $args[1];
};
$session->register('com.myapp.add2', $add2);

// 4) CALL a remote procedure
$session->call('com.myapp.add2', array(2, 3))->then(
    function ($res) {
        echo "Got result: {$res}\n";
    }
);