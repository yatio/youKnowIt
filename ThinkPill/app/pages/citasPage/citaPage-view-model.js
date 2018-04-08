var Observable = require("data/observable").Observable;
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");

function doAddOnMessageReceivedCallback() {
    LocalNotifications.addOnMessageReceivedCallback(
        function(notificationData) {
            dialogs.alert({
                title: "Notification received",
                message: "ID: " + notificationData.id +
                "\nTitle: " + notificationData.title +
                "\nBody: " + notificationData.body,
                okButtonText: "Excellent!"
            });
        }
    );
}

function createViewModel() {
    var viewModel = new Observable();

    viewModel.id = 0;
    viewModel.title = "Titulo";
    viewModel.body = "Texto";
    viewModel.ticker = "Ticker";

    doAddOnMessageReceivedCallback();

    viewModel.schedule = function() {
        LocalNotifications.schedule([{
            id: this.id,
            title: this.title,
            body: this.body,
            ticker: this.ticker,
            at: new Date(new Date().getTime() + (10 * 1000))
        }]).then(() => {
            console.log("Notification scheduled");
        }, (error) => {
            console.log("ERROR", error);
        });
    }

    return viewModel;
}

exports.createViewModel = createViewModel;