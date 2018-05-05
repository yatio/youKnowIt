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
            itemName: "Acetaminofen",
            itemDesc: "Aliva el dolor muscular, menstrual, garganta y",
            itemInfo: "fiebre"
            // itemImage: "~/images/headache.jpg"

        },

        {
            itemName: "Buscapina",
            itemDesc: "Alivia el dolor estomacal",
            // itemImage: "~/images/artritis.jpg"

        }, 

        {
            itemName: "Imodium",
            itemDesc: "Ayuda a disminuir deposiciones",
            // itemImage: "~/images/allergies.jpg"
            
        },

        {
            itemName: " Diphenhydramine",
            itemDesc: "Alivia los estornudos, picor en la nariz, ojos aguados",
            itemInfo: "y picor de garganta"
            // itemImage: "~/images/allergies.jpg"
            
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