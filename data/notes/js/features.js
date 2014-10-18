/**
 * 
 */
var start_time = 0;
var timerID = 0;
$(document).ready(function (event) {
	$('input[name=limit]').change(updateLimit);
	$('input[name=limit]')[0].addEventListener('input',updateLimit);
	$("button[name=start]").width($("button[name=start]").height());
	var watch = $('span#watch');
	var startBtn = watch.find('button[name=start]');
	startBtn.click(function (event) {
		start_time = new Date().getTime();
		$(this).text('Pause');
		updateWatch();
	});
});

function updateLimit(event) {
	$("#limitDisplay").text($(this).val());
}

function updateWatch() {
	var time_diff = new Date().getTime() - start_time;
	var s = Math.floor((time_diff/1000));
	var m = Math.floor(s/60);
	var h = Math.floor(m/60);
	var result = [h % 60,m % 60,s % 60];
	var timer = $('span.timer');
	var limit = $("#limitDisplay").text();
	if (limit-m <= 1) {
		timer.removeClass('finalSprint');
		timer.addClass('overrun');
	} else if (limit - m <= 5) {
		timer.removeClass('short');
		timer.removeClass('midway');
		timer.addClass('finalSprint');
	} else if (limit >= 15 && limit-m <= limit/2 ) {
		timer.removeClass('short');
		timer.addClass('midway');
		
	} else if (limit-m >= limit/2) {
		timer.addClass('short');
	}
	for (var i = 0; i < result.length; i++) {
		$(timer.find('span.time')[i]).text((result[i] < 10)?'0' + result[i]:result[i]);
	}
	timerID = setTimeout('updateWatch()',1000);
	
	
}
function startWatch(event) {

	startBtn.val('Pause');
	
}

function stopWatch() {
	
}
function pauseWatch() {
	
}
function resetWatch() {
	
}