var map;
    
      require([
        "esri/map", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", 
        "esri/graphic", "esri/layers/GraphicsLayer",
        "dojo/dom", "dojo/dom-attr", "dojo/domReady!"
      ], function(
        Map, Circle, SimpleFillSymbol, 
        Graphic, GraphicsLayer, 
        dom, domAttr
      ) {
        map = new Map("map", {
          basemap: "streets",
          center: [-120.741, 56.39],
          slider: false,
          zoom: 6
        });
        var symbol = new SimpleFillSymbol().setColor(null).outline.setColor("blue");
        var gl = new GraphicsLayer({ id: "circles" });
        var geodesic = dom.byId("geodesic");
        map.addLayer(gl);
        map.on("click", function(e) {
          var radius = map.extent.getWidth() / 10;
          var circle = new Circle({
            center: e.mapPoint,
            geodesic: domAttr.get(geodesic, "checked"),
            radius: radius
          });
          var graphic = new Graphic(circle, symbol);
          gl.add(graphic);
        });
      });
