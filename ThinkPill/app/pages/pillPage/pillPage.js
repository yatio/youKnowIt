var createViewModel = require("./pillPage-view-model").createViewModel;
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