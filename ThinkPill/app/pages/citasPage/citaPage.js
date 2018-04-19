// function onNavigatingTo(args) {
//     var page = args.object;
// }
// exports.onNavigatingTo = onNavigatingTo;

// function onNavigatingTo(args) {
//     var page = args.object;
    
// 	var gotData=page.navigationContext;
// 	LocalNotifications.requestPermission().then((granted) => {
//         if(granted) {
//             page.bindingContext = createViewModel();
//         }
//     })
//     // console.log(gotData.param1);
//     // console.log(gotData.param2);
// }
// exports.onNavigatingTo = onNavigatingTo;

var view = require("ui/core/view");
var drawer;

exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};
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
	drawer = view.getViewById(page, "sideDrawer");
	page.bindingContext = pageData;
	// var eventTitles = ["Lunch with Steve", "Meeting with Jane", "Q1 Recap Meeting"];
	var events = [];

	var j = 1;
	// for (var i = 0; i < eventTitles.length; i++) {
	
		var now = new Date();
		
		    (new Sqlite("my.db")).then(db => {
        // db.execSQL("DROP TABLE 'Citas';")
        db.all("SELECT * FROM citas").then(rows => {
			for(var row in rows) {
				console.log("id: ", rows[row][0]);
				console.log("titulo: ", rows[row][1]);
				var titulo = rows[row][1];
				console.log("dia: ", rows[row][2]);
				var day = rows[row][2];
				console.log("mes: ", rows[row][3]);
				var month = rows[row][3];
				// console.log("month " + month);
				console.log("year", rows[row][4]);
				var year = rows[row][4];
				console.log("hora", rows[row][5]);
				var hora = rows[row][5];
				console.log("minutos", rows[row][6]);
				var minutos = rows[row][6];
				//aqui iria si la hora es PM o AM
				var date = month + " " + day + ", " + year + " " + hora + ":" + minutos + ":00" ;
				var dates = "April 18, 2018 16:23:18";
				// console.log("year " + year);
				// var startDate = new Date(now.getFullYear(), now.getMonth(), j * 2, 12);
				// console.log("DATE: " + startDate);
				// var startDate = new Date(year, month, day, hora, minutos);
				var startDate = new Date(date);
				console.log("DATE: " + startDate);
				var endDate = new Date(year, month, day);
				var event = new calendarModule.CalendarEvent(titulo, startDate, startDate);
				console.log("event: " + event.title + " " + event.startDate);
				events.push(event);
				// console.log("events: " + events[0][1] + " " + events[1][1]);
				console.log("termino?");
						// var birthday = new Date('April 18, 2018 16:23:18');// se a~ade 4 veces para ver si salen las 4 pruebas :D
						// var event = new calendarModule.CalendarEvent("Birthday", birthday, birthday);
						// console.log("birthday " + birthday);//segundos
						// events.push(event);
						// // pageData.set("events", events);
			}
			pageData.set("events", events);
		});
	});
	
		// console.log("Chequiando cosas ");
		// console.log("now " + now);//todo
		// console.log("getDay " + now.getDay());//numero del dia de la semana
		// console.log("getSeconds " + now.getMonth());//mes
		// console.log("getDate " + now.getDate());//dia
		// console.log("getFullYear " + now.getFullYear());//año
		// console.log("getHours " + now.getHours());//hora
		// console.log("getMinutes " + now.getMinutes());//minutos
		// console.log("getSeconds " + now.getSeconds());//segundos
		//var birthday = new Date('April 14, 2018');
				
			
			
		// var startDate = new Date(now.getFullYear(), now.getMonth(), j * 2, 12);
		// var endDate = new Date(now.getFullYear(), now.getMonth(), (j * 2) + (j % 3), 13);
		// var event = new calendarModule.CalendarEvent(eventTitles[i], startDate, endDate);
		// var birthday = new Date('April 18, 2018 16:23:18');
		// var event = new calendarModule.CalendarEvent("Bir"+j, birthday, birthday);
		// console.log("birthday " + birthday);//segundos
		// events.push(event);
		// j++;
	// }
	// var birthday1 = new Date('April 14, 2018');
	// var event = new calendarModule.CalendarEvent("Birthday", birthday1, birthday1,true);
	// console.log("birthday " + birthday1);//segundos
	// events.push(event); 
	// var birthday = new Date('April 18, 2018 16:23:18');
	// var event = new calendarModule.CalendarEvent("Birthday", birthday, birthday);
	// console.log("birthday " + birthday);//segundos
	// events.push(event);
	// pageData.set("events", events);
	
	}
	// function addEvents(args){
    // var page = args.object;
    
	


	// 	page = args.object;
	// 	page.bindingContext = pageData;

	// 	var eventTitles = ["Lunch with Steve", "Meeting with Jane", "Q1 Recap Meeting"];
	// 	var events = [];

	// 	var j = 1;
	// 	for (var i = 0; i < eventTitles.length; i++) {
	// 		var now = new Date();
	// 		// console.log("Chequiando cosas ");
	// 		// console.log("now " + now);//todo
	// 		// console.log("getDay " + now.getDay());//numero del dia de la semana
	// 		// console.log("getSeconds " + now.getMonth());//mes
	// 		// console.log("getDate " + now.getDate());//dia
	// 		// console.log("getFullYear " + now.getFullYear());//año
	// 		// console.log("getHours " + now.getHours());//hora
	// 		// console.log("getMinutes " + now.getMinutes());//minutos
	// 		// console.log("getSeconds " + now.getSeconds());//segundos
	// 		var birthday = new Date('April 14, 2018');
	// 		var startDate = new Date(now.getFullYear(), now.getMonth(), j * 2, 12);
	// 		var endDate = new Date(now.getFullYear(), now.getMonth(), (j * 2) + (j % 3), 13);
	// 		var event = new calendarModule.CalendarEvent(eventTitles[i], startDate, endDate);
	// 		events.push(event);
	// 		j++;
	// 	}
	// 	var birthday1 = new Date('April 14, 2018');
	// 	var event = new calendarModule.CalendarEvent("Birthday", birthday1, birthday1,true);
	// 	console.log("birthday " + birthday1);//segundos
	// 	events.push(event);
	// 	var birthday = new Date('April 18, 2018 16:23:18');
	// 	var event = new calendarModule.CalendarEvent("Birthday", birthday, birthday);
	// 	console.log("birthday " + birthday);//segundos
	// 	events.push(event);
	// 	pageData.set("events", events);
	// }




var Sqlite = require("nativescript-sqlite");
// var createViewModel = require("./citaPage-view-model").createViewModel;
var createViewModelNot = require("./citaPage-view-model").createViewModelNot;
var LocalNotifications = require("nativescript-local-notifications");
function onNavigatingTo(args) {
    var page = args.object;
    
	
    // (new Sqlite("my.db")).then(db => {
    //     // db.execSQL("DROP TABLE 'Citas';")
    //     db.execSQL("CREATE TABLE IF NOT EXISTS Citas (id INTEGER PRIMARY KEY AUTOINCREMENT,dia TEXT, mes TEXT, year TEXT)").then(id => {
    //         page.bindingContext = createViewModel(db);
    //     }, error => {
    //         console.log("CREATE TABLE ERROR", error);
    //     });
    // }, error => {
    //     console.log("OPEN DB ERROR", error);
    // });

    // var page = args.object;
    LocalNotifications.requestPermission().then((granted) => {
        if(granted) {
            page.bindingContext = createViewModelNot();
        }
    })
}

exports.onNavigatingTo = onNavigatingTo;

