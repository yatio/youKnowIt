var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.titulo = "";
    viewModel.dia = "";
    viewModel.mes = "";
    viewModel.year = "";
    viewModel.hora = "";
    viewModel.minutos = "";
    

    viewModel.insert = function() {
        console.log("Entro aqui por lomenos");
            var mes = this.mes;
            console.log("MESES: " + mes);
            // if (mes > 0) 
            //     mes = parseInt(mes) - 1;
            // else
            //     mes = 0;

            console.log("MESES: " + mes);
        database.execSQL("INSERT INTO Citas (titulo, dia, mes, year, hora, minutos) VALUES (?, ?, ?, ?, ?, ?)", [this.titulo ,this.dia, mes, this.year, this.hora, this.minutos ]).then(id => { 
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