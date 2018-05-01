// function onNavigatingTo(args) {
//     var page = args.object;
// }
// exports.onNavigatingTo = onNavigatingTo;

// function onNavigatingTo(args) {
//     var page = args.object;
    
//     var gotData=page.navigationContext;
//     // console.log(gotData.param1);
//     // console.log(gotData.param2);
// }
// exports.onNavigatingTo = onNavigatingTo;
var frameModule =require("ui/frame");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = new Observable();

 function pageLoaded(args) {
    var page = args.object;
    var items = new ObservableArray([]);
    page.bindingContext = pageData;

    items.push(
        {
            itemName: "Dolor de Cabeza",
            itemDesc: "Síntomas: Migraña, Estres, Tensión",
            itemImage: "~/images/headache.jpg"

        },

        {
            itemName: "Dolor Estomacal",
            itemDesc: "Síntomas: Nauseas, Estreñimiento, Diarrea, Gases...",
            itemImage: "~/images/stomache.jpg"
           
        },

        {
            itemName: "Dolor Muscular",
            itemDesc: "Síntomas: Artritis, Espasmo, Dolor de Espalda",
            itemImage: "~/images/artritis.jpg"

        }, 

        {
            itemName: "Alergias",
            itemDesc: "Síntomas: Picor en la nariz, Estornudos, Picor en el cuerpo...",
            itemImage: "~/images/allergies.jpg"
            
        }

    )
     pageData.set("items", items);

};
exports.pageLoaded = pageLoaded;

exports.cabezaPage=function() {
    // console.log("Navigating");
    var navigationOptions={
        moduleName:'pages/infoPage/pages/cabezaPage/cabezaPage'//,
        // context:{param1: "value1",
        //         param2: "value2"
        //         }
    }
    
    frameModule.topmost().navigate(navigationOptions);
}