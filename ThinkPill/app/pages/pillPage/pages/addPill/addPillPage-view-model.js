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
    viewModel.titulo = "";
    viewModel.day = "01";
    viewModel.month = "01";
    viewModel.year = "2018";
    viewModel.hora = "12";
    viewModel.minutos = "00";
    console.log("entro")

    viewModel.insert = function() {
        console.log("Entro aqui por lomenos");
        console.log("viewModel.day: " + viewModel.day)
        console.log("viewModel.month: " + viewModel.month)
        console.log("viewModel.year: " + viewModel.year)
        console.log("viewModel.hora: " + viewModel.hora)
        console.log("viewModel.minutos: " + viewModel.minutos)
            var month = viewModel.month;
            console.log("MESES: " + month);
            if (viewModel.titulo !="")
                {
                    database.execSQL("INSERT INTO Pills (titulo, dia, mes, year, hora, minutos) VALUES (?, ?, ?, ?, ?, ?)", [this.titulo ,this.day, this.month, this.year, this.hora, this.minutos ]).then(id => { 
                    console.log("INSERT RESULT", id);
                    }, error => {
                    console.log("INSERT ERROR", error);
                    });
                    alert("Ya se añadio");
                }
            else
                {
                    alert("Falta el titulo");
                }
            // if (mes > 0) 
            //     mes = parseInt(mes) - 1;
            // else
            //     mes = 0;


    }

    viewModel.select = function() {
        database.all("SELECT * FROM Pills").then(rows => {
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