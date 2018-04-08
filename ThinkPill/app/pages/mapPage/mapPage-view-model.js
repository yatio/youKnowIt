var observable = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.set("latitude", 18.2208);
        this.set("longitude", -66.41596 );
        this.set("zoom", 8);
        this.set("minZoom", 0);
        this.set("maxZoom", 5);  
        // this.set("bearing", 180);
        // this.set("tilt", 35);
        this.set("padding", [80, 40, 40, 40]);
        this.set("mapAnimationsEnabled", true);
        console.log("entro y lo hizo");
    }

    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
