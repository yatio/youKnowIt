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
var createViewModel = require("./pillPage-view-model").createViewModel;
var createViewModelNot = require("./pillPage-view-model").createViewModelNot;
var LocalNotifications = require("nativescript-local-notifications");
function onNavigatingTo(args) {
    var page = args.object;
    

    // (new Sqlite("my.db")).then(db => {
    //     // db.execSQL("DROP TABLE 'citas';")
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

var view = require("ui/core/view");
var drawer;

exports.pageLoaded = function(args) {
    var page = args.object;
    drawer = view.getViewById(page, "sideDrawer");
};

exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};
