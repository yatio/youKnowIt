function onNavigatingTo(args) {
    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

function onNavigatingTo(args) {
    var page = args.object;
    
    var gotData=page.navigationContext;
    // console.log(gotData.param1);
    // console.log(gotData.param2);
}
exports.onNavigatingTo = onNavigatingTo;

var Observable = require("data/observable").Observable;
var calendarModule = require("nativescript-ui-calendar");

var page;
var pageData = new Observable();
function onDateSelected(args) {
    console.log("onDateSelected: " + args.date);
}
exports.onDateSelected = onDateSelected;

exports.pageLoaded = function(args) {
	page = args.object;
	page.bindingContext = pageData;

	var eventTitles = ["Lunch with Steve", "Meeting with Jane", "Q1 Recap Meeting"];
	var events = [];

	var j = 1;
	for (var i = 0; i < eventTitles.length; i++) {
		var now = new Date();
		console.log("Chequiando cosas ");
		console.log("now " + now);//todo
		console.log("getDay " + now.getDay());//numero del dia de la semana
		console.log("getSeconds " + now.getMonth());//mes
		console.log("getDate " + now.getDate());//dia
		console.log("getFullYear " + now.getFullYear());//año
		console.log("getHours " + now.getHours());//hora
		console.log("getMinutes " + now.getMinutes());//minutos
		console.log("getSeconds " + now.getSeconds());//segundos
		var birthday = new Date('April 14, 2018');
		var startDate = new Date(now.getFullYear(), now.getMonth(), j * 2, 12);
		var endDate = new Date(now.getFullYear(), now.getMonth(), (j * 2) + (j % 3), 13);
		var event = new calendarModule.CalendarEvent(eventTitles[i], startDate, endDate);
		events.push(event);
		j++;
	}
	var birthday1 = new Date('April 14, 2018');
	var event = new calendarModule.CalendarEvent("Birthday", birthday1, birthday1,true);
	console.log("birthday " + birthday1);//segundos
	events.push(event);
	var birthday = new Date('April 18, 2018 16:23:18');
	var event = new calendarModule.CalendarEvent("Birthday", birthday, birthday);
	console.log("birthday " + birthday);//segundos
	events.push(event);
	pageData.set("events", events);
}












//notificaciones

var createViewModel = require("./citaPage-view-model").createViewModel;
var LocalNotifications = require("nativescript-local-notifications");
function onNavigatingTo(args) {
    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

function onNavigatingTo(args) {
var page = args.object;
    LocalNotifications.requestPermission().then((granted) => {
        if(granted) {
            page.bindingContext = createViewModel();
        }
    })
}
exports.onNavigatingTo = onNavigatingTo;