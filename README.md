im_present
==========

This is a small firefox add-on designed to help you holding presentations with impress.js.

It basically scans the website it is activated on for 
\<div\> tags with the class 'note', contained within a 
<div> tag with the class 'step'.

The html content of those notes is then wrapped into a webpage, which gets displayed in a new browser 
window. This enables you to use html for the structure of the notes. 

The add-on waits for the 'impress:stepenter' event to scan the next slide and update the notes. 

It also features a slide counter and a rudimentary timer.

A very basic example for the structure the add-on is looking for:

<pre><code>\<div class='step slide'\> <br>
  This is a slide <br>
  \<div class='note'\> With a note \</div\> <br>
\</div\>
</code><pre>

This is my first add-on and I wrote hastily, so don't expect perfection. 


How to install 
==============

You can either download the existing .xpi file and install it into Firefox by opening 
the file with it (strg+o) or you can check the source and compile it yourself, using 
the addon sdk from Firefox. 


