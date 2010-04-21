
load('spec/support/jspec.js');
load('spec/support/jspec.xhr.js');
load('spec/support/mootools.js');
load('spec/support/mootools.more.js');

load('lib/yourlib.js');

load("src/namespaces.js");
load("src/Core/Class.Extras.Ext.js");
load("src/Widget/Animators.js");
load("src/Widget/Stateful.js");
load("src/Widget/Widget.js");
//load("src/Button/Button.js");
//load("src/Controller/Controller.js");

load('spec/unit/spec.helper.js');
JSpec
.exec('spec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()
