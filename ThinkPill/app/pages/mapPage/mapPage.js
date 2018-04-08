var vmModule = require("./mapPage-view-model");
var mapsModule = require("nativescript-google-maps-sdk");
var permissions = require("nativescript-permissions");
var application = require("application");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.onNavigatingTo = onNavigatingTo;
//

//  var GPlaces = require("nativescript-gplaces");
//   GPlaces.init({
//                 googleServerApiKey: 'your_api_Key',
//                 language: 'es',
//                 radius: '100000',
//                 location: '20.651130,-103.426464',
//                 errorCallback: function(text){console.log(text)}
//   });
//             // run autocomplete
//   GPlaces.queryAutoComplete(textSearch.text, types).then(function(result){
//       // predictions list
//   })
//     // run search
//   GPlaces.search(textSearch.text, types).then(function(result){
//       // search list
//   })
//      // get place details
//   GPlaces.details(placeId).then(function(place){
//       // place result
//   })

//
function wait(milliSeconds) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
           resolve(milliSeconds);
        }, milliSeconds);
    });
}
    function requestPermissions() {
  return new Promise(function(resolve, reject) {
    if (!application.android) return resolve(true);
    permissions.requestPermission([
          android.Manifest.permission.ACCESS_FINE_LOCATION,
          android.Manifest.permission.ACCESS_COARSE_LOCATION]//,
        //"This demo will stink without these..."
    )
        .then(function (result) {
          console.log("Permissions granted!");
          resolve(true);
        })
        .catch(function (result) {
          console.log("Permissions failed :(", result);
          resolve(false);
        });

  });
}
//lat,long,titulo,snippet,userdata y ya
var locData = [
    [18.4636367 , -66.7573729 , 'Professional Pharmacy' , 'Av. Catalina Santiago Chico, Arecibo, 00612, PR'],
    [18.4724373 , -66.73694619999999 , 'CVS Pharmacy' , 'Carr. Pr 2 Km.77.6, Arecibo, PR 00612, United States'],  
    [18.4464367, -66.6635888,"Good Care Pharmacy","# km. 68, Calle 2, Santana, 00612, PR"],
    [18.4790878 , -66.7564317 , 'Kmart Pharmacy' , 'Kmart, Arecibo, PR 00612, United States'],
    [18.4672818 , -66.7180833 , 'Farmacia Del Carmen' , 'Av. Juan Rosado, Arecibo, 00612, PR'],
    [18.4724373 , -66.73694619999999 , 'CVS' , 'Carr. Pr 2 Km.77.6, Arecibo, PR 00612, United States'],
    [18.4380212 , -66.7593831 , 'Farmacia Victoria' , 'Arecibo, 00612, PR'],
    [18.450997 , -66.7529411 , 'Farmacia Jireh' , 'San Rafael, Arecibo, 00612, PR'],
    [18.4684754 , -66.73079919999999 , 'Walgreens' , '580 Avenue San Luis, Arecibo, 00612, PR'],
    [18.4417363 , -66.7402858 , 'Farmacia El Junco' , 'km 2.5, PR-651, Arecibo, 00612, PR'],
    [18.4758666 , -66.75368879999999 , 'Farmacia Keitha' , 'Cll Local 109, Marginal, Arecibo, 00612, PR'],
    [18.4726176 , -66.7353559 , 'CVS' , '757 Calle San Millan, Arecibo, 00612, PR'],
    [18.4715153 , -66.71732279999999 , 'Farmacia Marilu' , '165 Calle San Felipe, Arecibo, 00612, PR'],
    [18.4722458 , -66.7189078 , 'Farmacia Central Arecibo' , '211 Av. José De Diego, Arecibo, 00612, PR'],
    [18.4676991 , -66.732011 , 'Farmacia 129' , 'Av. San Luis, Arecibo, 00612, PR'],
    [18.4554275 , -66.77732069999999 , 'Super Farmacia Corcovado' , 'Corcovado, Hatillo 00612, PR'],
    [18.487169 , -66.790379 , 'Sams Club Pharmacy' , 'Carr 2 Km 84.2 Bo Carrizales, Hatillo, 00659, PR'],
    




    [18.4684754, -66.73079919999999,"Walgreens Pharmacy","580 Avenue San Luis, Arecibo, 00612, PR"]
];

var mapsModule = require("nativescript-google-maps-sdk");
function addOnMap(mapView){
    console.log("Setting a marker...");
    console.log(locData.length);
    var longData = locData.length;
    for (i = 0; i < longData; i++) {
        console.log("entro al for1");
            var marker = new mapsModule.Marker();
            marker.userData = { index : i+1};
            marker.position = mapsModule.Position.positionFromLatLng(locData[i][0],locData[i][1]);
            marker.title = locData[i][2];
            marker.snippet = locData[i][3];
            
            mapView.addMarker(marker);
}
    // var marker = new mapsModule.Marker();
    // marker.position = mapsModule.Position.positionFromLatLng(18.2208,-66.5901);
    // marker.title = "Mi Pais1";
    // marker.snippet = "PR(lol)";
    // marker.userData = { index : 1};
    // mapView.addMarker(marker);
    // console.log("termino el marcador1");
    // console.log("Setting a marker...");
    // var marker = new mapsModule.Marker();
    // marker.position = mapsModule.Position.positionFromLatLng(18.3008,-66.5901);
    // marker.title = "Mi Pais2";
    // marker.snippet = "PR(xD)";
    // marker.userData = { index : 2};
    // mapView.addMarker(marker);
    // console.log("termino el marcador2");

    // console.log("Setting a marker...");
    // var marker = new mapsModule.Marker();
    // marker.position = mapsModule.Position.positionFromLatLng(18.2008,-66.5901);
    // marker.title = "home";
    // marker.snippet = "PR(lol)";
    // marker.userData = { index : 3};
    // mapView.addMarker(marker);
    // console.log("termino el marcador3");
    
}
function onMapReady(args) {
    var mapView = args.object;
    ///
    mapView.settings.zoomGesturesEnabled = true;
    mapView.settings.myLocationButtonEnabled = true;
    mapView.settings.mapToolbarEnabled = true;
    mapView.settings.zoomControlsEnabled =true;
    // console.log("geolocation ");
    // var geolocation = require("nativescript-geolocation");
    // geolocation.enableLocationRequest();
    // geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
    ///

    addOnMap(mapView);
        console.log("localizacion");
    requestPermissions().then(function(granted) {
        if(granted) {
            console.log("Enabling My Location..");
            mapView.myLocationEnabled = true;
            mapView.settings.myLocationButtonEnabled = true;
        }
        return wait(6000);
    });
    //   // Disabling zoom gestures
    //   mapView.settings.zoomGesturesEnabled = false;
    // mapView.settings.myLocationButtonEnabled = true;
    // mapView.settings.mapToolbarEnabled = true;
    mapView.settings.zoomControlsEnabled =true;
}



function onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
}

var lastCamera = null;
function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
///https://www.npmjs.com/package/nativescript-google-maps-sdk