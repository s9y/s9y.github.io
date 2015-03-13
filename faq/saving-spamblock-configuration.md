# Saving SpamBlock configuration

If your other plugins all work, then your server is probably trying to protect you by blocking forms with spam words in them. You can see the catch-22 here: you want to tell Serendipity what words are spam, which you must do via a form, but your provider is blocking forms that have spam words in them!

You can eliminate the spam words by using any non-empty string, such as ".". If the field is empty, Serendipity will believe you made no changes.

You can manually change the spam words in the database, using a tool such as phpMyAdmin.
