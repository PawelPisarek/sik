<?php
require __DIR__ . '/vendor/autoload.php';

use Vinelab\Minion\Provider;

class VersionProvider extends Provider {

    protected $prefix = 'com.minion.';

    public function boot()
    {
        // will be registered as com.minion.phpversion
        $this->register('phpversion', 'getPhpVersion');

        $this->call('phpversion')->then(function ($version) {
            var_dump('', "PHP Version: $version", '');
        });
    }

    public function getPhpVersion()
    {
        return phpversion();
    }
}