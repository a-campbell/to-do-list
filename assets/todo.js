/*
	THE JAVASCRIPT
 */

var todo = todo || {};

var data = JSON.parse(localStorage.getItem("todoData"));
data = data || {};

todo.init = function (options) {
	$.each(data, function (index, params) {
		generateElement(params);
	});

	// Adding drop function to delete div
	$("#delete-div").droppable({
		drop: function(event, ui) {
			var element = ui.helper,
				css_id = element.attr("id"),
				id = css_id.replace("task-", ""),
				object = data[id];

			// Removing old element
			removeElement(object);

			// Updating local storage
			delete data[id];
			localStorage.setItem("todoData", JSON.stringify(data));

			// Hiding Delete Area
			$("#delete-div").hide();
		}
	})

};

// Generate HTML elements
var generateElement = function(params){
	var wrapper;

	wrapper = $("<div />", {
		"class" : "todo-task",
		"id" : "task-" + params.id,
		"data" : params.id
	}).appendTo("#pending");

	$("<div />", {
		"class" : "header",
		"text": params.title
	}).appendTo(wrapper);

	$("<div />", {
		"class" : "todo-date",
		"text": params.date
	}).appendTo(wrapper);

	$("<div />", {
		"class" : "todo-description",
		"text": params.description
	}).appendTo(wrapper);

	wrapper.draggable({
		start: function() {
			$("#delete-div").show();
		},
		stop: function() {
			$("#delete-div").hide();
		}
	});
};

// Remove task
var removeElement = function (params) {
	$("#task-" + params.id).remove();
};

// Add Task Button: Stores user input in local storage and calls generateElement
todo.add = function() {
	var inputs = $("#todo-form :input"),
		id, title, description, date, tempData;

	title = inputs[0].value;
	description = inputs[1].value;
	date = inputs[2].value;

	if (!title) {
		return;
	}

	id = new Date().getTime();

	data[id] = {
		id : id,
		title: title,
		date: date,
		description: description
	}

	// Saving element in local storage
	localStorage.setItem("todoData", JSON.stringify(data));

	// Generate Todo Element
	generateElement(data[id]);

	// Reset Form
	inputs[0].value = "";
	inputs[1].value = "";
	inputs[2].value = "";
};

todo.clear = function () {
	data = {};
	localStorage.setItem("todoData", JSON.stringify(data));
	$(".todo-task").remove();
};

