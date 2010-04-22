# Vf-Widgets

Vf-Widgets is a javascript library that provides numereous Widgets 
to build a GUI for Rich Internet Application and is based on MooTools low level library.
The advantages of Vf-Widgets are their integration and unified API.
Vf-Widgets is trying to combine the best practices of well known libraries 
for other languages like Swing or GTK but also include all special aspects of DOM and JavaScript

## Princibles under this library:
  * Object oriented design
  * Unified API
  * JavaScript should not generate HTML too much

## Provided widgets:
  * Basic:
    * Widget - provides basic utility methods
    * Button - serves to indicate button that should do some actions on click
    * Link - extends the button and wraps _a_ tag, knows about _href_ and can do ajax call with it
    * Input - wraps any form input, knows about its label.
    * TextInput - wraps text input, provides placeholder support
  * Advanced - acts as container for other widgets
    * Controller - base for all advanced widgets, provides simplyfied API for nested widgets declaration
    * Form - wrap _form_ tab and provides some default behaviours like: reset on hide, hide on success etc.
    * Dialog - modal dialogs implementation
    * ConfirmDialog - Not yet implemented
    * FormDialog - modal dialog that contains only a form
    * List - wraps _ul_ or _ol_ tag, provides all set of array-like methods, autoupdated counter and more


## Examples

To get started look at examples folder.

## License 

(The MIT License)

Copyright (c) 2010 Bogdan Gusiev

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
