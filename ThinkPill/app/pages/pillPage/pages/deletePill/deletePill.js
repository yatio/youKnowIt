// var createViewModel = require("./pillPage-view-model").createViewModel;
// var LocalNotifications = require("nativescript-local-notifications");
// function onNavigatingTo(args) {
//     var page = args.object;
// }
// exports.onNavigatingTo = onNavigatingTo;

// function onNavigatingTo(args) {
//     console.log("Notification scheduled");
// var page = args.object;
//     LocalNotifications.requestPermission().then((granted) => {
//         if(granted) {
//             page.bindingContext = createViewModel();
//         }
//     })
// }
// exports.onNavigatingTo = onNavigatingTo;

var Sqlite = require("nativescript-sqlite");
var createViewModel = require("./deleteCitaPage-view-model").createViewModel;
var createViewModelNot = require("./deleteCitaPage-view-model").createViewModelNot;
var LocalNotifications = require("nativescript-local-notifications");
function onNavigatingTo(args) {
    var page = args.object;
     

    (new Sqlite("my.db")).then(db => {
        // db.execSQL("DROP TABLE 'citas';")
        db.execSQL("CREATE TABLE IF NOT EXISTS Citas (id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT, dia INTEGER, mes INTEGER, year INTEGER, hora INTEGER, minutos INTEGER)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });

    // var page = args.object;
    LocalNotifications.requestPermission().then((granted) => {
        if(granted) {
            page.bindingContext = createViewModelNot();
        }
    })
}

exports.onNavigatingTo = onNavigatingTo;

var view = require("ui/core/view");

exports.pageLoaded = function(args) {
    var items = [];
    items.push(
        {
            itemName: "Arcade Fire",
            itemDesc: "Funeral"
        },
        {
            itemName: "Bon Iver",
            itemDesc: "For Emma, Forever Ago"
        },
        {
            itemName: "Daft Punk",
            itemDesc: "Random Access Memories"
        },
        {
            itemName: "Elbow",
            itemDesc: "Build a Rocket Boys!"
        },
        {
            itemName: "Elbow",
            itemDesc: "Build a Rocket Boys!"
        },
        {
            itemName: "Elbow",
            itemDesc: "Build a Rocket Boys!"
        },
        {
            itemName: "Elbow",
            itemDesc: "Build a Rocket Boys!"
        }
    )
    var page = args.object;
    var listview = view.getViewById(page, "listview");
    listview.items = items;
}
