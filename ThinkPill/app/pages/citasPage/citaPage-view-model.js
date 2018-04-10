var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
//sql

var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.dia = "";
    viewModel.mes = "";
    viewModel.year = "";

    viewModel.insert = function() {
        database.execSQL("INSERT INTO Citas (dia, mes, year) VALUES (? , ? , ?);", [this.dia, this.mes, this.year]).then(id => { 
            console.log("INSERT RESULT", id);
            console.log("INSERT RESULT", this.dia);
            console.log("INSERT RESULT", this.mes);
            console.log("INSERT RESULT", this.year);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function() {
        database.all("SELECT * FROM Citas").then(rows => {
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