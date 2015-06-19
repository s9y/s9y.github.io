<?php
namespace Mattsches\Console\Tests\Command;

use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Console\Application;
use Mattsches\Console\Command\BuildCommand;

/**
 * Class BuildCommandTest
 * @package Mattsches\Console\Tests\Command
 */
class BuildCommandTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function testExecute()
    {
        $application = new Application();
        $application->add(new BuildCommand());

        $command = $application->find('build');
        $commandTester = new CommandTester($command);
        $commandTester->execute([
            'path' => __DIR__ . '/../fixtures01/',
            '--debug' => true,
        ]);

        $display = $commandTester->getDisplay();
        $this->assertContains($this->getExpectedFirst(), $display);
        $this->assertContains($this->getExpectedSecond(), $display);
        $this->assertContains($this->getExpectedFourth(), $display);
        $this->assertContains('menu_level_4', $display);
        $this->assertContains($this->getExpectedLevel4(), $display);
    }

    /**
     * @return string
     */
    private function getExpectedFirst()
    {
        return <<<EOT
<li class="first">
            <span>Themes and Smarty Templating</span>
            <ul class="menu_level_3">
              <li class="first">
                <span>Smarty</span>
              </li>
              <li>
                <span>Fallback templates</span>
              </li>
              <li>
                <span>Frontend Themes</span>
              </li>
              <li class="last">
                <span>Backend themes</span>
              </li>
            </ul>
          </li>
EOT;
    }

    /**
     * @return string
     */
    private function getExpectedSecond()
    {
        return <<<EOT
          <li>
            <span>Linking spartacus</span>
          </li>
EOT;
    }

    /**
     * @return string
     */
    private function getExpectedFourth()
    {
        return <<<EOT
          <li>
            <span>You hate Smarty? You’ve come a long way!</span>
            <ul class="menu_level_3">
              <li class="first">
                <span>Step 1: Create a template.inc.php file</span>
              </li>
              <li>
                <span>Step 2: Read more</span>
              </li>
              <li class="last">
                <span>Step 3: Create template files</span>
              </li>
            </ul>
          </li>
EOT;
    }

    /**
     * @return string
     */
    private function getExpectedLevel4()
    {
        return <<<EOT
            <li>
                <span>RSS in s9y</span>
                <ul class="menu_level_4">
                  <li class="first last">
                    <span>The rss.php file</span>
                  </li>
                </ul>
              </li>
EOT;
    }
}
