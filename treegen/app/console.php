<?php
require __DIR__ . '/../vendor/autoload.php';

use Mattsches\Console\Command\BuildCommand;
use Symfony\Component\Console\Application;

$console = new Application();
$console->add(new BuildCommand());
$console->run();
