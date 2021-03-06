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
var createViewModel = require("./deletePillPage-view-model").createViewModel;
var createViewModelNot = require("./deletePillPage-view-model").createViewModelNot;
var LocalNotifications = require("nativescript-local-notifications");
var ObservableArray = require("data/observable-array").ObservableArray;
function onNavigatingTo(args) {
    var page = args.object;
    

    (new Sqlite("my.db")).then(db => {
        // db.execSQL("DROP TABLE 'citas';")
        db.execSQL("CREATE TABLE IF NOT EXISTS Pills (id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT, dia INTEGER, mes INTEGER, year INTEGER, hora INTEGER, minutos INTEGER)").then(id => {
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
        db.all("SELECT * FROM Pills").then(rows => {
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
                            IDPill: rows[row][0],
                            namePill: titulo + " ",
                            datePill: day + " de " + month + " de " + year,
                            timePill: " a las " + hora + ":" + minutos
                        }
                    )
                     pageData.set("items", items);
                    enter++;
            }
                if(enter==0)
                    {
                        items.push(
                        {
                            IDPill: " ",
                            namePill: "No tienes ningun medicamento apuntado",
                            datePill: "",
                            timePill: ""
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
exports.deletePill=function(args) {
    console.log("entro aqui");
//    var page = args.object;
//     page.bindingContext = pageData;
    // var items = new ObservableArray([]);
    var sender = args.object;
    var parent = sender.parent;
    var idCitaDel = view.getViewById(parent,"PillID");
    var dataID = idCitaDel.text;
    var nameCitaDel = view.getViewById(parent,"PillName");
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
                        db.all("DELETE FROM Pills where id=" + dataID)
                            alert("Se borro: " + datasName);
                        });
                }           
    });
        }else 
            alert("Esto es un mensaje, no una pastilla");
}


function back() {
    console.log("Navigating");
    var navigationOptions={
        moduleName:'pages/pillPage'//,
        // context:{param1: "value1",
        //         param2: "value2"
        //         }
    }
    
    frameModule.topmost().navigate(navigationOptions);
}

