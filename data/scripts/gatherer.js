/**
 *  This script runs together with jquery on the website the 
 *  button gets triggered. It will gather information from the
 *  first slide, if any, and setup the listeners for new slides.
 */


/**
 * Gets called when a new slide is shown. 
 * @param event 
 * 		The event that was triggered  
 * 		
 */
var onNewSlide = function (event) {
	console.log('onNewSlide');
	var slide = $(event.currentTarget);
	var data = {
			'note' : slide.find('.note').html() || '', 
			'id' : slide.attr('id'), 
			'index' : $('.step').index(slide) + 1 
	};
	self.port.emit('newSlide', data);
};


// Possible optional change 
var eventName = 'impress:stepenter';
var slides = $('.step');
var notes = slides.find('.note');
if (slides.length <= 0 || notes.length <= 0) {
	alert('No slides or notes were found!');
} else {
	notes.hide();
	// Setup response to gather info, when notes are setup
	self.on('message',  function (data) {
		if (data.gather) {
			self.postMessage({'type' : 'basics', 'val' : {
				'slides' : slides.length,
				'notes' : notes.length,
				'pres_name' : document.title,
				'slide_name' : slides.first().attr('id'),
				'fst_note' : notes.first().html()
			}});
	}});
	
	for (var i = 0; i < slides.length; i++) {
		$(slides[i]).bind(eventName, onNewSlide);
	}
}

