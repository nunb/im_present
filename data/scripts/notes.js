/**
 * This script runs together with jQuery on the notes website and 
 * is responsible for setting up the even handler and first setup of
 * the display.
 */


self.on('message', function (data) {
	if (data.type == 'basics') {
		$('#total').text(data.val.slides);
		$('#presentation_name').text(data.val.pres_name);
		$('#slide_name').text(data.val.slide_name);
		$('.notes').html(data.val.fst_note);
	}
});
/**
 * Setup the notes for the new slide
 * 
 */
self.port.on('newSlide', function (data) {
	if (data.note == '') {
		$('.notes').html('<center><b>No Notes were found for slide ' + data.id + '</center></b>');
	} else {
		$('.notes').html(data.note);
	}
	$('#slide_name').text(data.id);
	$("#counter").text((data.index < 10)?'0' + data.index:data.index);
});
