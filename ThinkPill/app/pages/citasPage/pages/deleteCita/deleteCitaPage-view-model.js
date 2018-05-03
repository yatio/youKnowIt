var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var Sqlite = require("nativescript-sqlite");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.titulo = "prueba";
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
            // if (mes > 0) 
            //     mes = parseInt(mes) - 1;
            // else
            //     mes = 0;

            console.log("MESES: " + month);
        database.execSQL("INSERT INTO Citas (titulo, dia, mes, year, hora, minutos) VALUES (?, ?, ?, ?, ?, ?)", [this.titulo ,this.day, this.month, this.year, this.hora, this.minutos ]).then(id => { 
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }
    var dataItems;
    var listview = view.getViewById(page, "listview");
    // viewModel.select = function() {
        database.all("SELECT * FROM citas").then(rows => {
            for(var row in rows) {
                
                // console.log("RESULT", rows[row]);
                dataItems =  rows[row];
                console.log("Items", dataItems);
                viewModel.listview.items = items;
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    // }

    return viewModel;
}


exports.createViewModel = createViewModel;
