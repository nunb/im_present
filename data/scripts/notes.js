/**
 * 
 */
console.log('Note worker has been loaded.');
self.on('message', function (data) {
	if (data.type == 'basics') {
		console.log(data)
		$('#total').text(data.val.slides);
		$('#presentation_name').text(data.val.pres_name);
		$('#slide_name').text(data.val.slide_name);
		$('.notes').html(data.val.fst_note);
	}
});

self.port.on('impress:stepenter', function (data) {
	
	if (data.note == '') {
		$('.notes').html('<center><b>No Notes were found for slide ' + data.id + '</center></b>');
	} else {
		$('.notes').html(data.note);
	}
	
	$('#slide_name').text(data.id);
	$("#counter").text(data.index);
});
