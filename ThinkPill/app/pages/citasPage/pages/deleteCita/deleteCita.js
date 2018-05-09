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
var ObservableArray = require("data/observable-array").ObservableArray;
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
}exports.onNavigatingTo = onNavigatingTo;

var Observable = require("data/observable").Observable;

// var page;
var pageData = new Observable();
var dialogs = require("ui/dialogs");

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    var items = new ObservableArray([]);
    var enter = 0;
    (new Sqlite("my.db")).then(db => {
        db.all("SELECT * FROM citas").then(rows => {
            console.log("select");
			for(var row in rows) {
                var titulo = rows[row][1];
				var day = rows[row][2];
                var months = rows[row][3];
                switch(months) {
                    case 1:
                        var month = "Enero";
                        break;
                    case 2:
                        var month = "Febrero";
                        break;
                    case 3:
                        var month = "Marzo";
                        break;
                    case 4:
                        var month = "Abril";
                        break;
                    case 5:
                        var month = "Mayo";
                        break;
                    case 6:
                        var month = "Junio";
                        break;
                    case 7:
                        var month = "Julio";
                        break;
                    case 8:
                        var month = "Agosto";
                        break;
                    case 9:
                        var month = "Septiembre";
                    break;
                    case 10:
                        var month = "Octubre";
                    break;
                     case 11:
                        var month = "Noviembre";
                    break;
                    case 12:
                        var month = "Diciembre";
                    break;
                    default:
                        console.log("Error idk");
                        alert("error idk");
                }
				var year = rows[row][4];
				var hora = rows[row][5];
				var minutos = rows[row][6];
                console.log("items");
                items.push(
                        {
                            IDCita: rows[row][0],
                            nameCita: titulo + " ",
                            dateCita: day + " de " + month + " de " + year,
                            timeCita: " a las " + hora + ":" + minutos
                        }
                    )
                     pageData.set("items", items);
                    enter++;
            }
                if(enter==0)
                    {
                        items.push(
                        {
                            IDCita: " ",
                            nameCita: "No tienes ninguna cita apuntada",
                            dateCita: "",
                            timeCita: ""
                        }
                    )
                     pageData.set("items", items);
                    }
                    console.log("Rows: " + enter)
		});
    });

}

var view = require("ui/core/view");
var frameModule =require("ui/frame");
exports.deleteCita=function(args) {
    console.log("entro aqui");
//    var page = args.object;
//     page.bindingContext = pageData;
    // var items = new ObservableArray([]);
    var sender = args.object;
    var parent = sender.parent;
    var idCitaDel = view.getViewById(parent,"CitaID");
    var dataID = idCitaDel.text;
    var nameCitaDel = view.getViewById(parent,"CitaName");
    var datasName = nameCitaDel.text;
    // console.log("nameCitaDel:" + nameCitaDel);
    // console.log("nameCitaDel:" + nameCitaDel.text);

    //var datasName = nameCitaDel.text;
    if (dataID != " ")
        {
    // console.log("idCitaDel:" + idCitaDel);
    // console.log("dataID:" + dataID);
    dialogs.confirm({
        title: "¿Seguro?",
        message: "se borrara " + datasName,
        okButtonText: "Si",
        cancelButtonText: "No",
        }).then(function (result) {
            console.log("Results " + result);
            if(result == 1)
                {
                    // result argument is boolean
                    console.log("adentro " + result);
                    (new Sqlite("my.db")).then(db => {
                        db.all("DELETE FROM citas where id=" + dataID)
                            alert("Se borro: " + datasName);
                        });
                }           
    });
        }else 
            alert("Esto es un mensaje, no una cita");
}

function back() {
    console.log("Navigating");
    var navigationOptions={
        moduleName:'pages/citasPage'//,
        // context:{param1: "value1",
        //         param2: "value2"
        //         }
    }
    
    frameModule.topmost().navigate(navigationOptions);
}