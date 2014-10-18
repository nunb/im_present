var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var self = require('sdk/self');
var data = self.data;
var window = require('sdk/windows').browserWindows;

var noteWorker = null;
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
		url : self.data.url('notes/index.html'),
		inNewWindow : true,
		onReady : function (event) {
			
			noteWorker = this.attach({
			 	contentScriptFile :   [data.url('notes/js/jquery.js'),data.url('scripts/notes.js')],
			});
			console.log('Setup notes worker, gathering information.');
			stepWorker.postMessage({gather : true});
		},


	});
	//activeTab.attach({	contentScriptFile: [ self.data.url('notes.js'), self.data.url('notes.js')]});
	stepWorker.port.on('impress:stepenter', newStep);
	stepWorker.on('message',function (data) {
		if (data.type == 'basics') {
			noteWorker.postMessage(data);
		}
		
	});
	// noteWorker.postMessage(data);
};
function newStep(data) {
	noteWorker.port.emit('impress:stepenter',data);
	
}
//	worker.port.on('impress:stepenter', function (event) {
//		console.log('Event fired');
//		var step = event.currentTarget;
//		var note = step.getElementsByClassName('note');
//		console.log(note.html());
//		
//	});
//}