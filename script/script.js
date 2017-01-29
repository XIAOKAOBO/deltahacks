 
    function initMap() {

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14
      });
      var infoWindow = new google.maps.InfoWindow({ map: map });
      var pos;


      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });

      var request = {
        location: { lat: 43.2609, lng: -79.9192 },
        radius: '5000',
        types: ['museum', 'art_gallery', 'amusement_park', 'zoo']
      };

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

      function callback(results, status) {
        for (var j = 0; j < results.length; j++) {
          console.log("One of them is " + results[j].name+": at "+results[j].geometry.location);
          createMarker(results[j]);
        }
      }


      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          $(infowindow).setContent(place.name);
        $(infowindow).open(map, this);
        });
      }
    }

 