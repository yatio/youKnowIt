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

function createViewModelNot() {
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

exports.createViewModelNot = createViewModelNot;

//sql

var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.dia = "";
    viewModel.mes = "";
    viewModel.year = "";

    viewModel.insert = function() {
        console.log("Entro aqui por lomenos");
        database.execSQL("INSERT INTO Citas (dia, mes, year) VALUES (? , ? , ?)", [this.dia, this.mes, this.year]).then(id => { 
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function() {
        database.all("SELECT * FROM citas").then(rows => {
            for(var row in rows) {
                console.log("RESULT", rows[row]);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    return viewModel;
}

exports.createViewModel = createViewModel;