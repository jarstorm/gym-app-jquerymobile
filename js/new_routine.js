// Save step 1 method
function saveStep1() {
	var newRoutine = new Object();
	newRoutine.name = $("#name").val();

	sessionStorage.setItem("newRoutine", JSON.stringify(newRoutine));
	sessionStorage.numberOfExercise = 0;
}

// Add series fields to exercises
$(document).ready(function () {
	$("#add_exercise_series_number").on("keyup change", function(e) {
		var numberOfElements = this.value;
		var i = 0;	
		$("#series_list").empty();
		for (i = 0; i < numberOfElements; i++) {
			var object = JSON.parse(sessionStorage.getItem("exercise"+i));
			
			var element = '<div data-role="fieldcontain"><label for="serie'+i+'" class="text">Serie '+i+'</label><input type="number" id="serie'+i+'"></input><!-- /grid-b --></div>';
			$("#series_list").append(element);
		}
		
		// Redraw jquery elements
		$('#dialog_content').trigger('create');
	});
});

// Update exercises list of a routine
function updateExercisesList() {
	// Remove previous elements
	$("#exercises_list").empty();
	var header = '<li data-role="list-divider" role="heading"> Ejercicios </li>';	
	$("#exercises_list").append(header);
var numberOfExercise = sessionStorage.numberOfExercise;
	for (i = 0; i < numberOfExercise; i++) {
		var exercise = JSON.parse(sessionStorage.getItem("exercise"+i));
		var series = "Series: ";
		for (var j = 0; j < exercise.series.length; j++) {
			series += exercise.series[j].value + ",";
		}
		var element = '<li><a href="show_routine_exercise.html" rel="external"><h3>'+exercise.name+'</h3><p>'+exercise.exercise+'</p><p>'+ series + '</p><span class="ui-li-count">4</span></a></li>';
		
		$("#exercises_list").append(element);
	}
  $('#exercises_list').listview('refresh');
}

// Update the exercises list with the info inserted
$('#show_routine_details_page').bind('pageinit', updateExercisesList);

// Store a new exercise for a routine in the session storage
function storeNewRoutineExercise() {		
	var numberOfExercises = $("#add_exercise_series_number").val();
	var units = $("#radio-choice :radio:checked").val();
	var exercise = $("#exercise").val();
	var object = new Object();
	object.numberOfExercises = numberOfExercises;
	object.exercise = exercise;
	object.units = units;
	object.series = [];
	var seriesText = "Series: ";
	for (var i = 0; i < numberOfExercises; i++) {
		var id = "#serie"+i;
		var serie = new Object();
		serie.number = i;
		serie.value = $(id).val();		
		object.series.push(serie);
		seriesText += serie.value + ", ";
	}		
	
	var numberOfExercise = sessionStorage.numberOfExercise;
	sessionStorage.setItem("exercise" + numberOfExercise, JSON.stringify(object));
	sessionStorage.numberOfExercise = parseInt(numberOfExercise) + 1;
		
	updateExercisesList();	
	
	$.mobile.navigate("new_routine_step2.html");		
}

// Store the routine in DB
function storeRoutineInDB() {
	console.log("Insertada");	
}