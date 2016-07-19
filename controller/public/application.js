var App = function(lat, lng) {
  this.init = function() {
    function initMap(){
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {"lat": lat, "lng": lng},
        zoom: 16
      });
    }

    initMap.bind(this)();
    this.listenToMapChange();
    this.listenToCitySelect();
    this.listenToAddress();
    this.listenToLocation();
    this.listenToKeyPress();
  };

  this.map = null;
  this.currLocation = {
    lat: lat,
    lng: lng
  };

  this.getCurrentLocation = function() {
    return this.currLocation;
  };

  this.getLocationByAddress = function(address, callback) {
    $.ajax({
      type : "GET",
      url : "https://maps.googleapis.com/maps/api/geocode/json?address="+address.replace(/ /g, "+"),
      dataType : "JSON",
      success: function(data){
        callback(data.results[0].geometry.location);
      }
    });
  }

  this.getAddressByLocation = function(loc, callback) {
    $.ajax({
      type : "GET",
      url : "https://maps.googleapis.com/maps/api/geocode/json?latlng="+loc+"&sensor=true",
      dataType : "JSON",
      success: function(data){
        callback(data.results[0].formatted_address);
      }
    });
  }

  this.locationToString = function() {
    return this.currLocation["lat"] + ',' + this.currLocation["lng"];
  }

  this.updateGPSStorage = function(location) {
    this.currLocation = {lat: location.lat, lng: location.lng};
  };

  this.updateFrontEnd = function() {
    function updateMap(location){
      this.map.setCenter(location);
    }

    this.getAddressByLocation(this.locationToString(), function(address){
      $("#address").val(address);
    });

    $("#latitude").val(this.currLocation["lat"]);
    $("#longitude").val(this.currLocation["lng"]);

    updateMap.bind(this)(this.currLocation);
  };

  this.updateGPX = function() {
    $.ajax({
      type : "POST",
      url : "/update",
      data : {
        lat: this.currLocation.lat,
        lon: this.currLocation.lng
      },
      dataType : "JSON"
    });
  };

  this.setNewLocation = function(location) {
    this.updateGPSStorage(location);
    this.updateFrontEnd();
    this.updateGPX();
  };

  this.listenToMapChange = function() {
    this.map.addListener('mouseup', function() {
      this.setNewLocation({lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()});
    }.bind(this));
  };

  this.listenToCitySelect = function() {
    $("#location-change-button").click(function(){
      var context = this;
      this.getLocationByAddress($('#location-select').val(), function(result){
        context.setNewLocation(result);
      });
    }.bind(this));
  };

  this.listenToAddress = function() {
    $("#address-button").click(function(){
      var context = this;
      this.getLocationByAddress($('#address').val(), function(result){
        context.setNewLocation(result);
      });
    }.bind(this));
  };

  this.listenToLocation = function() {
    $("#location-button").click(function(){
      this.setNewLocation({'lat':parseFloat($('#latitude').val()), "lng":parseFloat($('#longitude').val())});
    }.bind(this));
  };

  this.listenToKeyPress = function() {
    function changeCurrentLocationOnKey(direction, location) {
      var newLocation;

      function moveInterval() {
        var randomNum = parseInt(10 * Math.random());
        var number = "0.000" + (100 + randomNum);
        return parseFloat(number);
      }

      if (direction == "left") {
        location.lng -= moveInterval();
      } else if (direction == "right") {
        location.lng += moveInterval();
      } else if (direction == "up") {
        location.lat += moveInterval();
      }  else if (direction == "down") {
        location.lat -= moveInterval();
      }

      // return location in {"lat" : lat, "lng" : lng} format
      return {"lat": location.lat, "lng": location.lng};
    }

    $(document).keyup(function(e){
      var direction = "";
      switch (e.keyCode) {
        case 38:
          direction = "up";
          break;
        case 40:
          direction = "down";
          break;
        case 37:
          direction = "left";
          break;
        case 39:
          direction = "right";
          break;
      }
      
      if(direction !== "") {
        this.currLocation = changeCurrentLocationOnKey(direction, this.currLocation);
        this.setNewLocation(this.currLocation);
      }
    }.bind(this));
  };

  this.init();
};
