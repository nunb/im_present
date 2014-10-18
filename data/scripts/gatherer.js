/**
 * 
 */
var notes = $('.step .note');
var slides = $('.step');
self.on('message', function (data) {
	if (data.gather) {
		console.log('Sending gathered Info');
		self.postMessage({'type' : 'basics', 'val' : {
			'slides' : slides.length,
			'notes' : notes.length,
			'pres_name' : document.title,
			'slide_name' : slides.first().attr('id'),
			'fst_note' : notes.first().html()
		}});
	}
});


notes.hide();
for (var i = 0; i < slides.length; i++) {
	var slide = $(slides[i]);
	slide.bind('impress:stepenter', function (event) {
		var data = {};
		var slide = $(event.currentTarget);
		data['note'] = slide.find('.note').html() || '';
		data['id'] = slide.attr('id');
		data['index'] = $('.step').index(slide) + 1;
		self.port.emit('impress:stepenter', data);
	});
};
console.log('Found ' + notes.length + ' notes in slides');