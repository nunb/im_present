var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var self = require('sdk/self');
var data = self.data;

/**
 * Worker on the note website
 */
var noteWorker = null;
/**
 * Worker on the impress website
 */
var stepWorker = null;

var button = buttons.ActionButton({
	id : 'notes',
	label : 'Show Slideshow Notes',
	onClick : handelClick,
	icon: {
	    "16": "./imgs/icon-16.png",
	    "32": "./imgs/icon-32.png",
	    "64": "./imgs/icon-64.png"
	  },
});

function handelClick() {

	
	// Setup Worker that reads the content of the presentation website.
	stepWorker = tabs.activeTab.attach({
		contentScriptFile : [data.url('notes/js/jquery.js'), data.url('scripts/gatherer.js')]
	});
	// Open new window to display the notes in.
	tabs.open({
		url : data.url('notes/index.html'),
		inNewWindow : true,
		onReady : function (event) {
			noteWorker = this.attach({
			 	contentScriptFile :   [data.url('notes/js/jquery.js'), data.url('scripts/notes.js')],
			});
			// Bounce the event
			stepWorker.port.on('newSlide', function (data) {
				noteWorker.port.emit('newSlide',data);
			});
			// onNewSlide Information gets bounced to noteWorker
			stepWorker.on('message', function (data) {
				if (data.type == 'basics') {
					noteWorker.postMessage(data);
				}
			});
			// Call gathering here because the note website must be set up first.
			stepWorker.postMessage({gather : true});
		}
	});
};
