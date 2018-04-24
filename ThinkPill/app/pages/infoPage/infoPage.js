function onNavigatingTo(args) {
    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

function onNavigatingTo(args) {
    var page = args.object;
    
    var gotData=page.navigationContext;
    // console.log(gotData.param1);
    // console.log(gotData.param2);
}
exports.onNavigatingTo = onNavigatingTo;


var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var items = new ObservableArray([]);
var pageData = new Observable();

exports.pageLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    items.push(
        {
            itemName: "Dolor de Cabeza",
            itemDesc: "Migraña, Estres, Tensión",
            itemImage: "~/images/headache.jpg"
        },
        {
            itemName: "Dolor Estomacal",
            itemDesc: "Nauseas, Estreñimiento, Diarrea, Gases...",
            itemImage: "~/images/stomache.jpg"
        },
        {
            itemName: "Alergias",
            itemDesc: "Picor en la nariz, Estornudos, Picor en el cuerpo...",
            itemImage: "~/images/allergies.jpg"
        }
    )

     pageData.set("items", items);

};


