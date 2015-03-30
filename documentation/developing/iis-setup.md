# Microsoft IIS Setup

*  [Execute Access Forbidden](#A2)
*  [Using Image Magick](#A3)

## <a name="A2"></a>Execute Access Forbidden

This information comes courtesy of **lyew** of the Serendipity forums.

This applies to users who have installed Serendipity on platforms similar to the following:

PHP 5.1.6 running in ISAPI mode

Microsoft Windows 2003/IIS6

Microsoft .NET framework (asp.net 2.0) enabled

PROBLEM

While trying to access a php file from the Serendipity directory, Microsoft IIS returns an http 403.1 error, showing this message:

**Forbidden: Execute Access Forbidden; This error can be caused if you try to execute a CGI, ISAPI, or other executable program from a directory that does not allow programs to be executed.**

In my particular case, there was no problem running index.php from the serendipity directory, and on first run, I was redirected to the serendipity-admin.php, where I saw a screen similar to that shown in:

[http://docs.s9y.org/documentation/getting-startet/fresh-installation.html](http://docs.s9y.org/documentation/getting-startet/fresh-installation.html)

Clicking on simple installation or expert installation successfully brought me to the configuration page, but when I clicked on "Complete Installation", I got the http 403.1 error message described above.

SOLUTION

Go to the IIS MMC and drill down to the website that Serendipity is installed in. Right click and go to properties. In the Home Directory Tab, ensure that the "Execute Permissions" is set to "Scripts" or "Scripts and Executables".

Click "configure" in the same Home Directory tab, and in the "Application Extensions" box locate the .php extension. Check to see if the "verbs" column for this extension has been set to "ALL". If not, you will need to select the .php extension, click on the edit button, and click the "All Verbs" radial button.

Click "OK" all the way to exit IIS manager.

In my particular case, I discovered that everything was set correctly: directory permissions, IIS website execute permissions. Apparently, I followed the suggested PHP configuration for "Verbs" to be set at "GET, POST,HEAD", but for Serendipity to execute, it appears that it needs to be set to "ALL".

## <a name="A3"></a>Using Image Magick

Thanks to **PaulF** from the forums, we now know that Image Magick requires either a PHP configuration change, or the Image Magick DLL must be in a subfolder of the Serendipity folder.